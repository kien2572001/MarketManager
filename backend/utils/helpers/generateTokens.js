import jwt from "jsonwebtoken";
import Token from "../../models/tokenModel";
const generateTokens = async (user) => {
    try {
        const payload = { id: user._id, role: user.role, user:user };
        const accessToken = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_PRIVATE_KEY || "ACCESS_TOKEN_PRIVATE_KEY",
            { expiresIn: "30d" }
        );
        const refreshToken = jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_PRIVATE_KEY || "REFRESH_TOKEN_PRIVATE_KEY",
            { expiresIn: "30d" }
        );

        const userToken = await Token.findOne({ userId: user._id });
        if (userToken) await userToken.remove();

        await new Token({ userId: user._id, token: refreshToken }).save();
        return Promise.resolve({ accessToken, refreshToken });
    } catch (err) {
        return Promise.reject(err);
    }
};

export default generateTokens;