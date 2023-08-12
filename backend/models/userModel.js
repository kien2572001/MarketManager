import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { ROLES } from "../enum/enum";

const { Schema } = mongoose;

/**
 * User Schema
 */
const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    hash_password: {
      type: String,
    },
    avatar: {
      type: String,
      default: "https://i.pinimg.com/originals/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg",
    },
    role: {
      type: Number,
      enum: Object.values(ROLES),
      default: ROLES.CUSTOMER,
    },
  },
  { timestamps: true }
);

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.hash_password);
};

const User = mongoose.model("User", UserSchema);
export default User;
