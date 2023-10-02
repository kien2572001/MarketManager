const mongoose = require('mongoose');
import User from "../../models/userModel.js";
import ShopBoat from "../../models/shopBoatModel.js";
import Category from "../../models/categoryModel.js";
import Product from "../../models/productModel.js";
import FeedBack from "../../models/feedBackModel.js";
import Tour from "../../models/tourModel.js";
import MarketFee from "../../models/marketFeeModel.js";
import ProductOrder from "../../models/productOrderModel.js";
import TourOrder from "../../models/tourOrderModel.js";
import {ROLES} from "../../enum/enum.js"
const { faker } = require('@faker-js/faker');
import slugify from "slugify";

// Kết nối tới MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Thêm dữ liệu vào MongoDB
let users = [];

users.push({
  firstName: "Admin",
  lastName: "Admin",
  email: "admin@gmail.com",
  hash_password: "$2b$10$BHm3/TU0/QuK6JudqCRBzufCN8o.4SIeUVj/3oloENWyUWZi/sb3i",
  avatar: faker.image.avatar(),
  role: ROLES.ADMIN,
});


for (let i = 1; i <= 10; i++) {
  users.push({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: "merchant" + i + "@gmail.com",
    hash_password: "$2b$10$BHm3/TU0/QuK6JudqCRBzufCN8o.4SIeUVj/3oloENWyUWZi/sb3i",
    address: faker.location.streetAddress(),
    avatar: faker.image.avatar(),
    role: ROLES.MERCHANT,
  })
}

for (let i = 1; i <= 10; i++) {
  users.push({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),  
    email: "customer" + i + "@gmail.com",
    hash_password: "$2b$10$BHm3/TU0/QuK6JudqCRBzufCN8o.4SIeUVj/3oloENWyUWZi/sb3i",
    avatar: faker.image.avatar(),
    role: ROLES.CUSTOMER,
    phone: faker.phone.number(),
    address: faker.location.streetAddress(),
  })
}



const deleteAllData = async () => {
  try {
    await User.deleteMany({});
    await Product.deleteMany({});
    await ShopBoat.deleteMany({});
    await Category.deleteMany({});
    await FeedBack.deleteMany({});
    await Tour.deleteMany({});
    await MarketFee.deleteMany({});
    await ProductOrder.deleteMany({});
    await TourOrder.deleteMany({});

    console.log("Users are deleted");
    console.log("ShopBoats are deleted");
    console.log("Categories are deleted");
    console.log("Products are deleted");
    console.log("FeedBacks are deleted");
    console.log("Tours are deleted");
    console.log("MarketFees are deleted");
    console.log("ProductOrders are deleted");
    console.log("TourOrders are deleted");

  }
  catch (err) {
    console.log(err);
  }
}

const insertShopBoat = async () => {
  try {
    let listUserId = await User.find({ role: ROLES.MERCHANT }).select('_id'); 
    let shopBoats = [];
    let id = 1;
    const numberTo4DigitSring = (number) => {
      let s = number.toString();
      while (s.length < 4) {
        s = "0" + s;
      }
      return s;
    }
      
    for (let i = 0; i < listUserId.length; i++) {
      shopBoats.push({
        name: faker.commerce.department(),
        description: faker.lorem.paragraphs({ min: 1, max: 3 }),
        avatar: "https://s3.nucuoimekong.com/ncmk/wp-content/uploads/dac-san-mien-tay.jpg",
        owner: listUserId[i]._id,
        type: faker.helpers.arrayElement(["Thuyền Lớn", "Thuyền Nhỏ", "Thuyền Trung", "Thuyền Cao Tốc", "Thuyền Cá Nhân", "Thuyền Mái Bạt "]),
        // code: "CR-" + numberTo4DigitSring(id++),
        status: faker.helpers.arrayElement([ "inactive", "banned"]),
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
    name: "Đồ khô",
    slug: "do-kho",
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
        let name = faker.commerce.productName();
        let slug = slugify(name, { lower: true });
        products.push({
          name: name,
          slug: slug,
          description: faker.commerce.productDescription(),
          price: faker.commerce.price(),
          image: "https://chonoicairang.net/wp-content/uploads/2020/04/cam-xoan-1.jpg",
          categories: [randomCategory(listCategory)],
          shopBoat: listShopBoatId[i]._id,
          unit: faker.helpers.arrayElement(["kg", "g", "l", "ml", "unit"]),
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

const insertFeedBack = async () => {
  try {
    let listUserId = await User.find({ role: ROLES.CUSTOMER }).select('_id');
    let listShopBoatId = await ShopBoat.find({}).select('_id');
    let feedBacks = [];
    for (let i = 0; i < listUserId.length; i++) {
      for (let j = 0; j < listShopBoatId.length; j++) {
        let chats = [];
        for (let k = 0; k < 10; k++) {
          chats.push({
            type: faker.number.int({ min: 0, max: 1 }),
            content: faker.lorem.paragraphs({ min: 1, max: 3 }),
          });
        }
        feedBacks.push({
          fromId: listUserId[i]._id,
          toId: listShopBoatId[j]._id,
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraphs({ min: 1, max: 3 }),
          chats: chats,
        });
      }
    }
    await FeedBack.insertMany(feedBacks);
    console.log("FeedBacks are inserted");
  }
  catch (err) {
    console.log(err);
  }
}
            
const insertTour = async () => {
  try {
    let tours = [];
    const keyList = ["Summary", "Shecdule", "What's included", "What's excluded", "What to bring", "Cancellation policy"];
    for (let i = 0; i < 10; i++) {
      let informations = [];
      for (let j = 0; j< keyList.length; j++) {
        informations.push({
          key: keyList[j],
          value: faker.lorem.paragraphs({ min: 1, max: 3 }),
        });
      }

      let scheduleType = faker.helpers.arrayElement(["daily", "weekly"]);
      let startTime;
      if (scheduleType === "daily") {
        startTime = faker.helpers.arrayElement(["7:00 t7", "13:00 t2", "14:00 t4", "7:00 t6"]);
      }
      else {
        startTime = faker.helpers.arrayElements(["t2", "t3", "t4", "t5", "t6", "t7", "cn"]);
        startTime.sort();
      }

      tours.push({
        name: "Tour " + faker.location.city(),
        image: "https://s3.nucuoimekong.com/ncmk/wp-content/uploads/tour-cho-noi-cai-rang-o-can-tho.jpg",
        slug: slugify("Tour " + faker.location.city(), { lower: true }),
        startTime: startTime,
        scheduleType: scheduleType,
        startLocation: faker.location.city(),
        tourDuration: faker.helpers.arrayElement(["2 tieng", "3 tieng","4 tieng" ,"6 tieng", "1 ngay", "2 ngay", "3 ngay"]),
        transportation: faker.helpers.arrayElement(["Xe may", "Xe dap", "Xe hoi", "Tau thuy"]),
        price: faker.commerce.price(),
        images: [faker.image.url(),faker.image.url(),faker.image.url(),faker.image.url(),faker.image.url()],
        tourInformation: informations,
      });
    }
    await Tour.insertMany(tours);
    console.log("Tours are inserted");
  }
  catch (err) {
    console.log(err);
  }
}

const insertMarketFee = async () => {
  try {
    let marketFees = [];
    let listShopBoatId = await ShopBoat.find({}).select('_id');
    
    for (let i = 0; i < 10; i++) {
      let payments = [];
      for (let j=0; j< listShopBoatId.length; j++) {
        payments.push({
          shopBoatId: listShopBoatId[j]._id,
          status: faker.helpers.arrayElement(["pending", "completed"]),
          paymentMethod: faker.helpers.arrayElement(["paypal", "stripe"]),
        });
      }
      marketFees.push({
        total: faker.commerce.price(),
        name: faker.lorem.sentence(),
        description: faker.lorem.paragraphs({ min: 1, max: 3 }),
        month: faker.number.int({ min: 1, max: 12 }),
        year: faker.number.int({ min: 2020, max: 2021 }),
        completed_payments: payments,
      });
    }
    await MarketFee.insertMany(marketFees);
    console.log("MarketFees are inserted");
  }
  catch (err) {
    console.log(err);
  }
}

const insertProductOrder = async () => {
  try {
    let productOrders = [];
    let listShopBoatId = await ShopBoat.find({}).select('_id');
    let listProductId = await Product.find({}).select('_id');
    let listUserId = await User.find({ role: ROLES.CUSTOMER }).select('_id');
    for (let i = 0; i < 20; i++) {
      let orderItems = [];
      for (let j = 0; j < 3; j++) {
        orderItems.push({
          product: faker.helpers.arrayElement(listProductId),
          quantity: faker.number.int({ min: 1, max: 10 }),
          price: faker.commerce.price(),
          sale: faker.number.int({ min: 0, max: 10 }),
        });
      }
      productOrders.push({
        status: faker.helpers.arrayElement(["pending", "accepted", "cancelled"]), // "pending", "accepted", "cancelled
        paymentMethod: faker.helpers.arrayElement(["paypal", "stripe"]),
        total: faker.commerce.price(),
        shopBoatId: faker.helpers.arrayElement(listShopBoatId),
        orderItems: orderItems,
        customer: faker.helpers.arrayElement(listUserId),
      });
    }
    await ProductOrder.insertMany(productOrders);
    console.log("ProductOrders are inserted");
  }
  catch (err) {
    console.log(err);
  }
}


const insertTourOrder = async () => {
  try {
    let tourOrders = [];
    let listTourId = await Tour.find({}).select('_id');
    let listUserId = await User.find({ role: ROLES.CUSTOMER }).select('_id');
    for (let i = 0; i < 50; i++) {
      let tourPrice = faker.commerce.price();   
      let quantity = faker.number.int({ min: 1, max: 8 });
      let total = tourPrice * quantity;
      tourOrders.push({
        status: faker.helpers.arrayElement(["pending", "accepted", "cancelled"]),
        paymentMethod: faker.helpers.arrayElement(["paypal", "stripe"]),
        tourTime: faker.date.anytime(),
        tourPrice: tourPrice,
        quantity: quantity,
        total: total,
        tourId: faker.helpers.arrayElement(listTourId),
        userId: faker.helpers.arrayElement(listUserId),
      });
    }
    await TourOrder.insertMany(tourOrders);
    console.log("TourOrders are inserted");
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
    await insertFeedBack();
    await insertTour();
    await insertMarketFee();
    await insertProductOrder();
    await insertTourOrder();
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


