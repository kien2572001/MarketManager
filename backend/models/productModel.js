import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { SoftDeleteModel } from "mongoose-delete";
import MongooseDelete from "mongoose-delete";


const { Schema } = mongoose;

/**
 * ProductSchema 
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

const ProductSchema = new Schema(
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
      },
      price: {
          type: Number,
          required: true,
      },
      sale: {
          type: Number,
          trim: true,
          maxlength: 32,
          default: 0,
      },
      countInStock: {
          type: Number,
          required: true,
          default: 0,
      },
      information: [InformationSchema],
      image: String,
      unit: {
            type: String,
            required: true,
            enum: ["kg", "g", "l", "ml", "unit"],
            default: "unit",
        },
      categories: [
          {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Category",
              required: true,
          },
      ],
      shopBoat: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ShopBoat",
          required: true,
      },
  },
  { timestamps: true }
);

ProductSchema.plugin(mongoosePaginate);
ProductSchema.plugin(MongooseDelete, {
    deletedByType: String,
    deletedAt: true,
    overrideMethods: true,
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;

