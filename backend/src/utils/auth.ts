import * as jwt from "jsonwebtoken"


export function createJWT(data: { token: string; }, expires: number) {
  return jwt.sign(data, "PRIVATE KEY GOES HERE", { expiresIn: expires });
}

export function verifyJWT(token: string): { token: string; iat: number; } {
  return jwt.verify(token, "PRIVATE KEY GOES HERE") as any;
}