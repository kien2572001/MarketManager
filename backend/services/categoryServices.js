import Category from "../models/categoryModel";

exports.getAllCategories = (pageOptions) => {
  return new Promise((resolve, reject) => {
    Category.paginate({}, pageOptions, (err, categories) => {
      if (err) {
        reject(err);
      } else {
        resolve(categories);
      }
    });
  });
}

exports.getCategoryBySlug = (slug) => {
  return new Promise((resolve, reject) => {
    Category.findOne({ slug: slug })
      .exec((err, category) => {
        if (err) {
          reject(err);
        } else {
          resolve(category);
        }
      });
  });
}

exports.createCategory = (category) => {
  return new Promise((resolve, reject) => {
    Category.create(category, (err, category) => {
      if (err) {
        reject(err);
      } else {
        resolve(category);
      }
    });
  });
}

exports.checkCategoryExists = (slug) => {
  return new Promise((resolve, reject) => {
    Category.findOne({ slug: slug })
      .exec((err, category) => {
        if (err) {
          reject(err);
        } else {
          resolve(category);
        }
      });
  });
}