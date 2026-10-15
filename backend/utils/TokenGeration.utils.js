import jwt from 'jsonwebtoken'

export const generateTokens = (userId) => {
    const accessToken = jwt.sign(
        { id: userId },
        process.env.ACCESSTOKENSECRATE,
        { expiresIn: "7m" }
    );

    const refreshToken = jwt.sign(
        { id: userId },
        process.env.REFRESHTOKENSECRATE,
        { expiresIn: "7d" }
    );

    return { accessToken, refreshToken };
};