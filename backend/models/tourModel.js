import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { ROLES } from "../enum/enum";

const { Schema } = mongoose;

/**
 * Tour Schema
 */

const InformationSchema = new Schema({
    key: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
});

const TourSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 100,
        },
        slug: {
            type: String,
            trim: true,
            required: true,
            maxlength: 100,
            unique: true,
            index: true,
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
        sale: {
            type: Number,
            trim: true,
            maxlength: 32,
        },
        tourInformation: [InformationSchema],
        reviews: Array,
    },
    { timestamps: true }
);

const Tour = mongoose.model("Tour", TourSchema);

export default Tour;
