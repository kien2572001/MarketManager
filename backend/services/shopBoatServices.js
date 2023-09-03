import ShopBoat from "../models/shopBoatModel";

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


exports.getShopBoatProducts = (id) => {
  return new Promise((resolve, reject) => {
    ShopBoat.findById(id)
      .populate('products')
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