import Category from "../models/categoryModel";
import Product from "../models/productModel";
import slugify from "slugify";

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

exports.updateProductById = async (id, data) => {
  let update_data = await product_params(data);
  try {
    const product = Product.findOneAndUpdate({ _id: id }, update_data, {
      new: true,
    }).populate("categories").exec();
    return product;
  } catch (err) {
    throw err;
  }
}

const product_params = async (body) => {
  let categories_slug = body.categories.split(",");
  let categories = categories_slug.map((slug) => {
    return slug.trim();
  });
  
  categories= await Category.find({ slug: { $in: categories } }).select("_id").exec();
  categories = categories.map((category) => category._id);
  let slug = slugify(body.name, { lower: true });
  let information = JSON.parse(body.information)
  console.log(information);
  return {
    name: body.name,
    price: body.price,
    sale: body.sale,
    unit: body.unit,
    countInStock: body.countInStock,
    description: body.description,
    categories: categories,
    slug: slug,
    information: information,
  };
}
