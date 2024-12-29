import crypto from "crypto";

export function encryptPWD(pwd: string, salt: string) {
  return crypto
    .createHash("sha256")
    .update(pwd + salt)
    .digest("hex");
}
