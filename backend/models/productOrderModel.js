import mongoose from "mongoose";
import { ROLES } from "../enum/enum";
import mongoosePaginate from "mongoose-paginate-v2";

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
            enum: ["pending", "accepted", "cancelled"],
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
        customer: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        orderItems: [OrderItemSchema],
      },
    { timestamps: true }
);

ProductOrderSchema.plugin(mongoosePaginate);

ProductOrderSchema.virtual("customerName").get(function () {
    return this.customer.firstName + " " + this.customer.lastName;
}
);

ProductOrderSchema.set('toJSON', { virtuals: true });

const ProductOrder = mongoose.model("ProductOrder", ProductOrderSchema);

export default ProductOrder;
        
