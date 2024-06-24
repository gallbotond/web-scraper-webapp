// token functions
export function generateToken(email) {
    return jwt.sign({ email }, ACCESS_TOKEN_SECRET, { expiresIn: "25s" });
}

export function generateRefreshToken(email) {
    return jwt.sign({ email }, REFRESH_TOKEN_SECRET);
}
