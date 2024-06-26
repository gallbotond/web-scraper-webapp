import jwt from "jsonwebtoken";

import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config.js";

// token functions
export function generateToken(email) {
    return jwt.sign({ email }, ACCESS_TOKEN_SECRET, { expiresIn: "55m" });
}

export function generateRefreshToken(email) {
    return jwt.sign({ email }, REFRESH_TOKEN_SECRET);
}
