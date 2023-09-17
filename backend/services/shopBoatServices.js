import ShopBoat from "../models/shopBoatModel";
import Product from "../models/productModel";

exports.getAllShopBoats = (pageOptions, includeProducts = false) => {
  let options = pageOptions;
  if (includeProducts) {
    options.populate = "products";
  }
  else {
    options.select = "-products";
  }
    
  return new Promise((resolve, reject) => {
    ShopBoat.paginate({}, options, (err, shopBoats) => {
      if (err) {
        reject(err);
      } else {
        resolve(shopBoats);
      }
    });
  });
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

exports.getShopBoatProducts = async (id, page, limit) => {
  try {
    const options = {
      page: page || 1,
      limit: limit || 10, // Số sản phẩm trên mỗi trang
      populate: "categories",
    };
    const filter = { shopBoat: id };
    const result = await Product.paginate(filter, options);

    return result;
  } catch (error) {
    // Xử lý lỗi nếu có
    throw error;
  }
}

exports.getShopBoadByOwnerId = (ownerId) => {
  return new Promise((resolve, reject) => {
    ShopBoat.findOne({ owner: ownerId }, (err, shopBoat) => {
      if (err) {
        reject(err);
      } else {
        resolve(shopBoat);
      }
    });
  });
}