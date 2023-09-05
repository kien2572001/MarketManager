const mongoose = require('mongoose');
import User from "../../models/userModel.js";
import ShopBoat from "../../models/shopBoatModel.js";
import Category from "../../models/categoryModel.js";
import Product from "../../models/productModel.js";

import insertUser from "./user_seeder.js";
import insertShopBoat from "./shopBoat_seeder.js";


// Kết nối tới MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

const insertData = async () => {
  try {
    await insertUser();
    await insertShopBoat();
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