import User from "../../models/userModel.js";
import ShopBoat from "../../models/shopBoatModel.js";
import {ROLES} from "../../enum/enum.js"

let shopBoats = [];

const insertShopBoat = async () => {
  try {
    let listUserId = await User.find({ role: ROLES.MERCHANT }).select('_id'); 
    for (let i = 0; i < shopSeed.length; i++) {
      shopBoats.push({
        name: shopSeed[i].name,
        description: shopSeed[i].description,
        address: shopSeed[i].address,
        avatar: shopSeed[i].avatar,
        owner: listUserId[i]._id,
      });
    }
    await ShopBoat.insertMany(shopBoats);
    console.log("ShopBoats are inserted");
  }
  catch (err) {
    console.log(err);
  }
}

let shopSeed = [{
    name: "Cửa Hàng Trái Cây Miền Tây",
    description: "Cửa hàng chuyên cung cấp các loại trái cây miền tây",
    address: "123 Nguyễn Văn Cừ, Quận 5, TP.HCM",
    avatar: "https://ksetup.vn/wp-content/uploads/2022/04/sieu-thi-trai-cay-5.jpg",
  },
  {
    name: "Dac San Mien Tay",
    description: "Cửa hàng chuyên cung cấp các loại trái cây miền tây",
    address: "195 Ngô Tất Tố, phường 22, quận Bình Thạnh, HCM",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNyU4mUlpqgz4grfi7SFMx-XLMfHMNYmE_7ky0dTjJ8DWIAwPpllGHNRn7n130--citzw&usqp=CAU",
  },
  {
    name: "Đặc Sản Cần Thơ",
    description: "Đặc Sản Cần Thơ Huỳnh Thảo là cửa hàng xuất thân từ cơ sở bánh tét lá cẩm gia truyền hơn 40 năm. Đặc sản làm quà nổi bật gồm: bánh tét lá cẩm, khô nhái, khô cá lóc, khô cá chạch, khô cá kèo, khô cá sặc, …",
    address: "Ben Ninh Kieu, Can Tho",
    avatar: "https://dacsancantho.vn/wp-content/uploads/2022/12/logo-da%CC%A3%CC%86c-sa%CC%89n-ca%CC%82%CC%80n-tho%CC%9B-huy%CC%80nh-tha%CC%89o-2023.jpg",
  },
  {
    name: "Cửa hàng Bà Sáu",
    description: "Chuyên cung cấp các loại cá tươi sống nước mặn và ngọt",
    address: "127 Trần Văn Long, P. An Khánh, Quận Ninh Kiều, Cần Thơ",
    avatar: "https://images.foody.vn/res/g102/1013281/prof/s576x330/foody-upload-api-foody-mobile-110-200316101107.jpg",
  },
]


export default insertShopBoat;
