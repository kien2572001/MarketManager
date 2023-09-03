const mongoose = require('mongoose');
import User from "../../models/userModel.js";
import ShopBoat from "../../models/shopBoatModel.js";
import Category from "../../models/categoryModel.js";
import Product from "../../models/productModel.js";
import {ROLES} from "../../enum/enum.js"
const { faker } = require('@faker-js/faker');

// Kết nối tới MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Thêm dữ liệu vào MongoDB
let users = [];
for (let i = 0; i < 10; i++) {
  users.push({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    hash_password: "$2b$10$BHm3/TU0/QuK6JudqCRBzufCN8o.4SIeUVj/3oloENWyUWZi/sb3i",
    avatar: faker.image.avatar(),
    role: faker.number.int({ min: 0, max: 2 }),
  })
}


const deleteAllData = async () => {
  try {
    await User.deleteMany({});
    await Product.deleteMany({});
    await ShopBoat.deleteMany({});
    await Category.deleteMany({});
    console.log("Users are deleted");
    console.log("ShopBoats are deleted");
    console.log("Categories are deleted");
  }
  catch (err) {
    console.log(err);
  }
}

const insertShopBoat = async () => {
  try {
    let listUserId = await User.find({ role: ROLES.MERCHANT }).select('_id'); 
    let shopBoats = [];
    for (let i = 0; i < listUserId.length; i++) {
      shopBoats.push({
        name: faker.commerce.department(),
        description: faker.lorem.paragraphs({ min: 1, max: 3 }),
        address: faker.location.streetAddress() + ", " + faker.location.city(),
        avatar: faker.image.avatar(),
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

const rootCategories = [
  {
    name: "Trái cây",
    slug: "trai-cay",
    parent: null,
  },
  {
    name: "Rau củ",
    slug: "rau-cu",
    parent: null,
  },
  {
    name: "Thịt",
    slug: "thit",
    parent: null,
  },
  {
    name: "Cá",
    slug: "ca",
    parent: null,
  },
  {
    name: "Gạo",
    slug: "gao",
    parent: null,
  },
  {
    name: "Bánh kẹo",
    slug: "banh-keo",
    parent: null,
  },
  {
    name: "Đồ uống",
    slug: "do-uong",
    parent: null,
  },
  {
    name: "Đồ khô",
    slug: "do-kho",
    parent: null,
  },
  {
    name: "Đồ gia dụng",
    slug: "do-gia-dung",
    parent: null,
  },
];

const insertCategory = async () => {
  const listCategory = await Category.insertMany(rootCategories);
  console.log("Categories are inserted");
}

const randomCategory = (idArray) => {
  let l = idArray.length;
  let n = faker.number.int({ min: 0, max: l - 1 });
  return idArray[n];
}

const insertProduct = async () => {
  try {
    let products = [];
    let listShopBoatId = await ShopBoat.find({}).select('_id');
    let listCategory = await Category.find({}).select('_id');
    for (let i = 0; i < listShopBoatId.length; i++) {
      for (let j = 0; j < 10; j++) {
        products.push({
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: faker.commerce.price(),
          images: [faker.image.url(),faker.image.url(),faker.image.url(),faker.image.url(),faker.image.url()],
          categories: [randomCategory(listCategory)],
          shopBoat: listShopBoatId[i]._id,
          information: [
            {
              key: "Xuất xứ",
              value: faker.location.city(),
            },
            {
              key: "Thương hiệu",
              value: faker.company.name(),
            },
            {
              key: "Trọng lượng",
              value: faker.number.int({ min: 1, max: 10 }) + " kg",
            },
            {
              key: "Kích thước",
              value: faker.number.int({ min: 1, max: 10 }) + " cm",
            },
            {
              key: "Màu sắc",
              value: faker.color.human(),
            },
            {
              key: "Chất liệu",
              value: faker.commerce.productMaterial(),
            }
          ],
        });
      }
    }
    await Product.insertMany(products);
    for (let i = 0; i < listShopBoatId.length; i++) {
      let listProductId = await Product.find({ shopBoat: listShopBoatId[i]._id }).select('_id');
      await ShopBoat.findByIdAndUpdate(listShopBoatId[i]._id, { products: listProductId });
    }
    console.log("Products are inserted");
  }
  catch (err) {
    console.log(err);
  }
}



const insertData = async () => {
  try {
    await User.insertMany(users);
    console.log("Users are inserted");
    await insertCategory();
    await insertShopBoat();
    await insertProduct();

  }
  catch (err) {
    console.log(err);
  }
}

const seedData = async () => {
  await deleteAllData();
  await insertData();
  process.exit();
}
exports.seedData = seedData;


