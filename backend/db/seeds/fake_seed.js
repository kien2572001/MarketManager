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
        let name = faker.commerce.productName();
        let slug = slugify(name, { lower: true });
        products.push({
          name: name,
          slug: slug,
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
      tours.push({
        name: "Tour " + faker.location.city(),
        slug: slugify("Tour " + faker.location.city(), { lower: true }),
        startTime: faker.date.future(),
        startLocation: faker.location.city(),
        transportation: faker.lorem.sentence(),
        description: faker.lorem.paragraphs({ min: 1, max: 3 }),
        price: faker.commerce.price(),
        images: [faker.image.url(),faker.image.url(),faker.image.url(),faker.image.url(),faker.image.url()],
        information: informations,
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
    for (let i = 0; i < 50; i++) {
      let orderItems = [];
      for (let j = 0; j < 10; j++) {
        orderItems.push({
          product: faker.helpers.arrayElement(listProductId),
          quantity: faker.number.int({ min: 1, max: 10 }),
          price: faker.commerce.price(),
          sale: faker.number.int({ min: 0, max: 100 }),
        });
      }
      productOrders.push({
        status: faker.helpers.arrayElement(["pending", "completed"]),
        paymentMethod: faker.helpers.arrayElement(["paypal", "stripe"]),
        total: faker.commerce.price(),
        shopBoatId: faker.helpers.arrayElement(listShopBoatId),
        orderItems: orderItems,
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
      tourOrders.push({
        status: faker.helpers.arrayElement(["pending", "accepted", "cancelled"]),
        paymentMethod: faker.helpers.arrayElement(["paypal", "stripe"]),
        total: faker.commerce.price(),
        quantity: faker.number.int({ min: 1, max: 10 }),
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


