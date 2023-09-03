import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema } = mongoose;


const CategorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    parent: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: false,
    },
  },
  { timestamps: true }
);

CategorySchema.plugin(mongoosePaginate);

const Category = mongoose.model("Category", CategorySchema);
export default Category;
