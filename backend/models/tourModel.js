import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { ROLES } from "../enum/enum";
import mongoosePaginate from "mongoose-paginate-v2";

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
        image: {
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
        startTime: {
            type: Schema.Types.Mixed,
            required: true,
        },
        scheduleType: {
            type: String,
            required: true,
            enum: ["daily", "weekly", "monthly"],
        },
        tourDuration: {
            type: String,
            required: true,
        },
        startLocation: {
            type: String,
            trim: true,
            required: true,
            maxlength: 100,
        },
        transportation: {
            type: String,
            trim: true,
            required: true,
            maxlength: 100,
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

TourSchema.plugin(mongoosePaginate);

const Tour = mongoose.model("Tour", TourSchema);

export default Tour;
