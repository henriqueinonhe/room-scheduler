import crypto from "crypto";

export async function hashPassword(password) {
  const hash = crypto.createHash("sha256");
  hash.update(password);

  const hashedPassword = hash.digest("hex");
  return hashedPassword;
}

export async function generateSessionId() {
  const a = Math.random();
  const b = Math.random();
  const c = Date.now();
  const base = `${a}${b}${c}`;

  const hash = crypto.createHash("sha256");
  hash.update(base);
  const sessionId = hash.digest("hex");
  return sessionId;
}