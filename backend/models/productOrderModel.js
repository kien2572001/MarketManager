import mongoose from "mongoose";
import { ROLES } from "../enum/enum";

const { Schema } = mongoose;

const OrderItemSchema = new Schema(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        sale: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);  

const ProductOrderSchema = new Schema(
    {
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
        total: {
            type: Number,
            required: true,
        },
        shopBoatId: {
            type: Schema.Types.ObjectId,
            ref: "ShopBoat",
            required: true,
        },
        orderItems: [OrderItemSchema],
      },
    { timestamps: true }
);


const ProductOrder = mongoose.model("ProductOrder", ProductOrderSchema);

export default ProductOrder;
        
