import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { ROLES } from "../enum/enum";

const { Schema } = mongoose;

const PaymentSchema = new Schema(
    {
        shopBoatId: {
            type: Schema.Types.ObjectId,
            ref: "ShopBoat",
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ["pending", "completed"],
            default: "pending",
        },
        paymentMethod: {
            type: String,
            required: true,
            enum: ["paypal", "stripe"],
        },
    },
    { timestamps: true }
);      


const MarketFeeSchema = new Schema(
    {
        total: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        month: {
            type: Number,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        completed_payments: [PaymentSchema],
    },
    { timestamps: true }
);

const MarketFee = mongoose.model("MarketFee", MarketFeeSchema);

export default MarketFee;
