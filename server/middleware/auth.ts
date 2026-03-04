import { createMiddleware } from "hono/factory";
import * as jose from "jose";

const JWT_SECRET_KEY = () => {
  const secret = process.env.JWT_SECRET || "neli-admin-secret-change-me";
  return new TextEncoder().encode(secret);
};

export async function signToken(payload: { sub: string; username: string }) {
  return new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET_KEY());
}

export async function verifyToken(token: string) {
  const { payload } = await jose.jwtVerify(token, JWT_SECRET_KEY());
  return payload as { sub: string; username: string };
}

export const authMiddleware = createMiddleware(async (c, next) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  try {
    const token = authHeader.slice(7);
    const payload = await verifyToken(token);
    c.set("user" as never, payload);
    await next();
  } catch {
    return c.json({ error: "Invalid or expired token" }, 401);
  }
});
