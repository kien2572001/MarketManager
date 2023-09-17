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

export { getTop4Products, getListProductsInHomePage, getProductBySlug };
