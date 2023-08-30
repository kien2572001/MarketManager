import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { ROLES } from "../enum/enum";

const { Schema } = mongoose;

const messageSchema = new Schema(
    {
        type: {
            type: Number,
            enum: [0, 1], // 0: question, 1: answer
            required: true,
        },
        content: {
            type: String,
            trim: true,
            required: true,
            maxlength: 1000,
        },
    },
    { timestamps: true }  
);


const FeedBackSchema = new Schema(
    {
        fromId: {
            type: String,
            trim: true,
            required: true,
            maxlength: 100,
        },
        toId: {
            type: String,
            trim: true,
            required: true,
            maxlength: 100,
        },
        title: {
            type: String,
            trim: true,
            required: true,
            maxlength: 100,
        },
        content: {
            type: String,
            trim: true,
            required: true,
            maxlength: 2000,
        },
        chats: [messageSchema]
    },
    { timestamps: true }
);

const FeedBack = mongoose.model("FeedBack", FeedBackSchema);

export default FeedBack;
