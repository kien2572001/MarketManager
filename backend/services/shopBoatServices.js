import ShopBoat from "../models/shopBoatModel";
import Product from "../models/productModel";
import Category from "../models/categoryModel";

exports.getAllShopBoats = (pageOptions, includeProducts = false, queryCondition = {}) => {
  let options = pageOptions;
  if (includeProducts) {
    options.populate = "products";
  }
  options.populate = "owner";
  options.sort = { createdAt: -1 };
    
  return new Promise((resolve, reject) => {
    ShopBoat.paginate(queryCondition, options, (err, shopBoats) => {
      if (err) {
        reject(err);
      } else {
        resolve(shopBoats);
      }
    });
  });
}

exports.getListCategoriesOfShop = async (shopBoatId) => {
  try {
    const shopBoat = await ShopBoat.findById(shopBoatId).populate('products');
  
    if (!shopBoat) {
      throw new Error('ShopBoat not found');
    }
  
    const products = shopBoat.products;
    const categories = new Set();
  
    products.forEach(product => {
      product.categories.forEach(category => {
        categories.add(category.toString());
      });
    });

    let output = await Category.find({ _id: { $in: [...categories] } });

  
    return output;
  } catch (error) {
    console.error("Error occurred:", error.message);
    throw error;
  }
}  


exports.getShopBoatById = (id) => {
  return new Promise((resolve, reject) => {
    ShopBoat.findById(id)
      .populate('owner', 'firstName lastName email') // Chọn các trường bạn muốn hiển thị từ bảng User
      .exec((err, shopBoat) => {
        if (err) {
          // Xử lý lỗi nếu có
          reject(err);
        } else {
          // Khi truy vấn thành công, bạn có thể truy cập thông tin owner thông qua shopBoat.owner
          resolve(shopBoat);
        }
      });
  });
}


// exports.getShopBoatProducts = (id) => {
//   return new Promise((resolve, reject) => {
//     ShopBoat.findById(id)
//       .populate('products')
//       .exec((err, shopBoat) => {
//         if (err) {
//           // Xử lý lỗi nếu có
//           reject(err);
//         } else {
//           // Khi truy vấn thành công, bạn có thể truy cập thông tin owner thông qua shopBoat.owner
//           resolve(shopBoat);
//         }
//       });
//   });
// }

exports.getShopBoatProducts = async (id, page, limit, queryCondition) => {
  try {
    const options = {
      page: page || 1,
      limit: limit || 10, // Số sản phẩm trên mỗi trang
      populate: "categories",
    };
    const filter = { shopBoat: id , ...queryCondition};
    console.log("service", filter);
    const result = await Product.paginate(filter, options);

    return result;
  } catch (error) {
    // Xử lý lỗi nếu có
    throw error;
  }
}

exports.getShopBoadByOwnerId = (ownerId) => {
  return new Promise((resolve, reject) => {
    ShopBoat.findOne({ owner: ownerId })
    .populate('owner')
    .exec((err, shopBoat) => {
      if (err) {
        reject(err);
      } else {
        resolve(shopBoat);
      }
    });
  });
}

exports.updateShopBoat = (id, data) => {
  return new Promise((resolve, reject) => {
    ShopBoat.findByIdAndUpdate(id, data, { new: true }, (err, shopBoat) => {
      if (err) {
        reject(err);
      } else {
        resolve(shopBoat);
      }
    });
  });
}

const numberTo4DigitString = (number) => {
  let result = number.toString();
  while (result.length < 4) {
    result = "0" + result;
  }
  return result;
}

exports.updateShopBoatById = async (id, data) => {
  try {
    // If the code field is not provided in the update data
    if (!data.code && data.status === 'active') {
      const currentCount = await ShopBoat.countDocuments({ code: { $exists: true } });
      data.code = "CR-" + numberTo4DigitString(currentCount + 1);
    }

    const updatedShopBoat = await ShopBoat.findByIdAndUpdate(id, data, {
      new: true, 
    }).populate('owner'); // populate owner here

    if (!updatedShopBoat) {
      throw new Error('No ShopBoat found with the provided ID');
    }

    return updatedShopBoat;
  } catch (error) {
    console.error('Error updating ShopBoat:', error);
    throw error;
  }
};

