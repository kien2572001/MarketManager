import instance from "api/axios";

const getTop4Products = () => {
  try {
    const response = instance.get(`/products/top4`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getListProductsInHomePage = () => {
  try {
    const response = instance.get(`/products/homepage`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getProductBySlug = (slug) => {
  try {
    const response = instance.get(`/products/${slug}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const searchProduct = (page, limit, query) => {
  try {
    let url = "/customer/products/search?page=" + page + "&limit=" + limit;
    if (query.name) {
      url += "&name=" + query.name;
    }
    const response = instance.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getProductByCategory = (page, limit, categorySlug) => {
  try {
    let url =
      "/customer/products/category/" +
      categorySlug +
      "?page=" +
      page +
      "&limit=" +
      limit;
    const response = instance.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export {
  getTop4Products,
  getListProductsInHomePage,
  getProductBySlug,
  searchProduct,
  getProductByCategory,
};
