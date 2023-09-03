import Product from "../models/productModel";

exports.getAllProducts = (pageOptions) => {
  let options = pageOptions;
  options.populate = "categories";
  return new Promise((resolve, reject) => {
    Product.paginate({}, options, (err, products) => {
      if (err) {
        reject(err);
      } else {
        resolve(products);
      }
    });
  });
}

exports.getProductById = (id) => {
  return new Promise((resolve, reject) => {
    Product.findById(id)
      .populate('shopBoat', '-products') // Chọn các trường bạn muốn hiển thị từ bảng User
      .populate('categories') 
      .exec((err, product) => {
        if (err) {
          // Xử lý lỗi nếu có
          reject(err);
        } else {
          // Khi truy vấn thành công, bạn có thể truy cập thông tin owner thông qua product.owner
          resolve(product);
        }
      });
  });
}

exports.deleteProductById = (id) => {
  return new Promise((resolve, reject) => {
    Product.findByIdAndDelete(id, (err, product) => {
      if (err) {
        reject(err);
      } else {
        resolve(product);
      }
    });
  });
}