import ShopBoat from "../../models/shopBoatModel";
import Product from "../../models/productModel";
import Category from "../../models/categoryModel";
const { faker } = require('@faker-js/faker');
import slugify from "slugify";

const randomCategory = (idArray) => {
  let l = idArray.length;
  let n = faker.number.int({ min: 0, max: l - 1 });
  return idArray[n];
}

const insertProductByRootCategory = async (category) => {
  try {
    let products = [];
    let listShopBoatId = await ShopBoat.find({}).select('_id');
    let parentId = await Category.findOne({ slug: category }).select('_id');
    parentId = parentId._id;
    let children = await Category.find({ parent: parentId }).select('_id');
    children = children.map((child) => child._id);
    for (let i = 0; i < listShopBoatId.length; i++) {
      for (let j = 0; j < 10; j++) {
        let name = faker.commerce.productName();
        let slug = slugify(name, { lower: true });
        products.push({
          name: name,
          slug: slug,
          description: faker.commerce.productDescription(),
          price: faker.number.int({ min: 10, max: 50 } ) * 10000,
          image: "https://chonoicairang.net/wp-content/uploads/2020/04/cam-xoan-1.jpg",
          categories: [parentId, faker.helpers.arrayElement(children)],
          shopBoat: listShopBoatId[i]._id,
          unit: faker.helpers.arrayElement(["1kg", "túi 5 cân", "10 quả ", "10kg"]),
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
  }
  catch (err) {
    console.log(err);
  }
}


const insertProduct = async () => {
  try {
    await insertProductByRootCategory("nong-san-sach");
    await insertProductByRootCategory("nogn-san-che-bien");
    await insertProductByRootCategory("thu-cong-my-nghe");
    await insertProductByRootCategory("mat-hang-khac");
    
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

export default insertProduct;