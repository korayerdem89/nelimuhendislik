const BCRYPT_PREFIX = "$2";

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
  return Bun.password.hash(password, {
    algorithm: "bcrypt",
    cost: 10,
  });
}

export async function verifyPassword(
  password: string,
  storedHash: string,
): Promise<boolean> {
  if (storedHash.startsWith(BCRYPT_PREFIX)) {
    return Bun.password.verify(password, storedHash);
  }

  const legacy = await legacySha256Hash(password);
  return legacy === storedHash;
}
