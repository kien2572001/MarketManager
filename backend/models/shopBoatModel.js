import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema } = mongoose;

const ShopBoatSchema = new Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
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
        address: {
            type: String,
            trim: true,
            required: true,
            maxlength: 2000,
        },
        avatar: {
            type: String,
            default: "https://i.pinimg.com/originals/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg",
        },
        images: Array,
        products: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        }],
    },
    { timestamps: true }
);

ShopBoatSchema.plugin(mongoosePaginate);

const ShopBoat = mongoose.model("ShopBoat", ShopBoatSchema);

export default ShopBoat;
