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
        type: {
            type: String,
            required: true,
            maxlength: 100,
            default: "Thuyền Lớn",
            enum: ["Thuyền Lớn", "Thuyền Nhỏ", "Thuyền Trung", "Thuyền Cao Tốc", "Thuyền Cá Nhân", "Thuyền Mái Bạt "] // enum means string objects
        },
        code: {
            type: String,
            trim: true,
            maxlength: 100,
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
        status: {
            type: String,
            default: "inactive",
            enum: ["active", "inactive", "banned"],
        },
    },
    { timestamps: true }
);

ShopBoatSchema.plugin(mongoosePaginate);

// Tạo trường ảo "address" dựa trên thông tin của "owner"
ShopBoatSchema.virtual("address").get(function() {
    // Lấy địa chỉ từ thông tin owner (user)
    if (this.owner && this.owner.address) {
        return this.owner.address;
    }
    return ""; // Trả về chuỗi rỗng nếu không có địa chỉ
});

const ShopBoat = mongoose.model("ShopBoat", ShopBoatSchema);

export default ShopBoat;
