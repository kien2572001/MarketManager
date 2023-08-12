import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { ROLES } from "../enum/enum";

const { Schema } = mongoose;

/**
 * Tour Schema
 */

const TourSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 100,
        },
        description: {
            type: String,
            trim: true,
            required: true,
            maxlength: 2000,
        },
        price: {
            type: Number,
            trim: true,
            required: true,
            maxlength: 32,
        },
        touSchedule: Array,
        includes: Array,
        albums: Array,
        reviews: Array,
    },
    { timestamps: true }
);

const Tour = mongoose.model("Tour", TourSchema);

export default Tour;
