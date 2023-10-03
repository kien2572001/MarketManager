import mongoose from "mongoose";
import { ROLES } from "../enum/enum";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema } = mongoose;

const TourOrderSchema = new Schema(
    {
        status: {
            type: String,
            required: true,
            enum: ["pending", "accepted", "cancelled"],
            default: "pending",
        },
        paymentMethod: {
            type: String,
            required: true,
            enum: ["paypal", "stripe"],
        },
        tourTime: {
            type: Date,
            required: true,
        },
        tourPrice: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
        tourId: {
            type: Schema.Types.ObjectId,
            ref: "Tour",
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

TourOrderSchema.plugin(mongoosePaginate);

const TourOrder = mongoose.model("TourOrder", TourOrderSchema);

export default TourOrder;