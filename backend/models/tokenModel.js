import mongoose from "mongoose";

const { Schema } = mongoose;

const TokenSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 30 * 86400 }, // 30 days
});

const Token = mongoose.model("Token", TokenSchema);

export default Token;