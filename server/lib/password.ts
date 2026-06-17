const PBKDF2_PREFIX = "pbkdf2:";
const BCRYPT_PREFIX = "$2";
const PBKDF2_ITERATIONS = 100_000;

function toBase64Url(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString("base64url");
}

function fromBase64Url(value: string): Uint8Array {
  return new Uint8Array(Buffer.from(value, "base64url"));
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a[i]! ^ b[i]!;
  }
  return diff === 0;
}

async function derivePbkdf2(
  password: string,
  salt: Uint8Array,
): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations: PBKDF2_ITERATIONS,
      hash: "SHA-256",
    },
    key,
    256,
  );
  return new Uint8Array(bits);
}

async function legacySha256Hash(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(
    password + (process.env.JWT_SECRET || "neli-admin-secret-change-me"),
  );
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const derived = await derivePbkdf2(password, salt);
  return `${PBKDF2_PREFIX}${PBKDF2_ITERATIONS}:${toBase64Url(salt)}:${toBase64Url(derived)}`;
}

export async function verifyPassword(
  password: string,
  storedHash: string,
): Promise<boolean> {
  if (storedHash.startsWith(PBKDF2_PREFIX)) {
    const parts = storedHash.split(":");
    if (parts.length !== 4) return false;

    const [, , saltB64, hashB64] = parts;
    if (!saltB64 || !hashB64) return false;

    const salt = fromBase64Url(saltB64);
    const expected = fromBase64Url(hashB64);
    const derived = await derivePbkdf2(password, salt);
    return timingSafeEqual(derived, expected);
  }

  if (storedHash.startsWith(BCRYPT_PREFIX)) {
    try {
      return await Bun.password.verify(password, storedHash);
    } catch {
      return false;
    }
  }

  const legacy = await legacySha256Hash(password);
  return legacy === storedHash;
}

export function passwordHashKind(storedHash: string): string {
  if (storedHash.startsWith(PBKDF2_PREFIX)) return "pbkdf2";
  if (storedHash.startsWith(BCRYPT_PREFIX)) return "bcrypt";
  return "legacy-sha256";
}
