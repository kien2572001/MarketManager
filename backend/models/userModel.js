import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
  },
  { timestamps: true }
);

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.hash_password);
};

const User = mongoose.model("User", UserSchema);
export default User;
