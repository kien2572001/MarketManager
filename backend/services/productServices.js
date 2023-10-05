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



exports.getProductBySlug = (slug) => {
  return new Promise((resolve, reject) => {
    Product.findOne({ slug: slug })
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
    Product.deleteById(id, (err, product) => {
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

exports.createProduct = async (data, shopBoatId) => {
  let product = await product_params(data);
  product.shopBoat = shopBoatId;
  try {
    const new_product = await Product.create(product);
    return new_product;
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
    image: body.image,
  };
}


exports.getTop4Products = () => {
  return new Promise((resolve, reject) => {
    Product.find({})
      .limit(4)
      .select("_id name price sale unit countInStock slug image")
      .exec((err, products) => {
        if (err) {
          reject(err);
        } else {
          resolve(products);
        }
      });
  });
}

exports.getListProductsInHomePage = async () => {
  let top_3_categories = await Category.find({}).limit(3).select("_id name slug").exec();
  let listId = top_3_categories.map((category) => category._id);
  //Xu li logic sau
  let top_1 = {
    name: top_3_categories[0].name,
    slug: top_3_categories[0].slug,
    id: top_3_categories[0]._id,
  }
  let top_2 = {
    name: top_3_categories[1].name,
    slug: top_3_categories[1].slug,
    id: top_3_categories[1]._id,
  }
  let top_3 = {
    name: top_3_categories[2].name,
    slug: top_3_categories[2].slug,
    id: top_3_categories[2]._id,
  }
  let top_1_products = await Product.find({ categories: top_3_categories[0]._id }).limit(10).select("_id name price sale unit countInStock slug image").exec();
  let top_2_products = await Product.find({ categories: top_3_categories[1]._id }).limit(10).select("_id name price sale unit countInStock slug image").exec();
  let top_3_products = await Product.find({ categories: top_3_categories[2]._id }).limit(10).select("_id name price sale unit countInStock slug image").exec();
  let orther_products = await Product.find({ categories: { $nin: listId } }).limit(10).select("_id name price sale unit countInStock slug image").exec();
    
  return [
    {
      category: top_1,
      products: top_1_products,
    },
    {
      category: top_2,
      products: top_2_products,
    },
    {
      category: top_3,
      products: top_3_products,
    },
    {
      category: {
        name: "Sản phẩm khác",
        slug: "san-pham-khac",
        id: "san-pham-khac",
      },
      products: orther_products,
    },
  ]
}

exports.searchProduct = async (pageOptions, queryConditions) => {
  let options = pageOptions;
  options.populate = "categories";
  return new Promise((resolve, reject) => {
    Product.paginate(queryConditions, options, (err, products) => {
      if (err) {
        reject(err);
      } else {
        resolve(products);
      }
    });
  });
}

exports.getProductByCategory = async (pageOptions, categorySlug) => {
  let options = pageOptions;
  let category = await Category.findOne({ slug: categorySlug }).select("_id").exec();
  console.log("category", category);
  options.populate = "categories";
  return new Promise((resolve, reject) => {
    Product.paginate({ categories: { $in: category._id } }, options, (err, products) => {
      if (err) {
        reject(err);
      } else {
        resolve(products);
      }
    });
  });
}