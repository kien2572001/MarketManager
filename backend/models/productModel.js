import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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
      description: {
          type: String,
          trim: true,
          required: true,
          maxlength: 2000,
      },
      price: {
          type: Number,
          required: true,
      },
      information: [InformationSchema],
      images: Array,
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

const Product = mongoose.model("Product", ProductSchema);

export default Product;

