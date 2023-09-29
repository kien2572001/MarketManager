import instance from "api/axios";

const getShopBoatProducts = async (id, page = 1, limit = 10, formData = {}) => {
  let url = `/shopBoats/${id}/products?page=${page}&limit=${limit}`;
  if (formData.name) {
    url += `&name=${formData.name}`;
  }
  if (formData.priceMin) {
    url += `&minPrice=${formData.priceMin}`;
  }
  if (formData.priceMax) {
    url += `&maxPrice=${formData.priceMax}`;
  }
  if (formData.category_id) {
    url += `&category_id=${formData.category_id}`;
  }
  if (formData.inStock) {
    url += `&inStock=${formData.inStock}`;
  }
  if (formData.discount) {
    url += `&discount=${formData.discount}`;
  }
  try {
    const response = await instance.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (id, data) => {
  try {
    const response = await instance.put(`/products/${id}`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (id) => {
  try {
    const response = await instance.delete(`/products/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const createProduct = async (data) => {
  try {
    const response = await instance.post(`products`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getShopBoatByOwnerId = async (id) => {
  try {
    const response = await instance.get("/users/" + id + "/shopBoat");
    return response;
  } catch (error) {
    console.log(error);
  }
};

const updateShopBoat = async (data) => {
  try {
    const response = await instance.put("/shopBoats", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getAllShopBoats = async (page = 1, limit = 10, formData = {}) => {
  let url = `/shopBoats?page=${page}&limit=${limit}`;
  if (formData.name) {
    url += `&name=${formData.name}`;
  }
  if (formData.status) {
    url += `&status=${formData.status}`;
  }
  if (formData.code) {
    url += `&code=${formData.code}`;
  }
  if (formData.phone) {
    url += `&phone=${formData.phone}`;
  }
  if (formData.type) {
    url += `&type=${formData.type}`;
  }

  try {
    const response = await instance.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const updateShopBoatById = async (id, data) => {
  try {
    const response = await instance.put(`/shopBoats/${id}`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getListCategoriesOfShop = async (id) => {
  try {
    const response = await instance.get(`/shopBoats/${id}/categories`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export {
  getShopBoatProducts,
  updateProduct,
  deleteProduct,
  getShopBoatByOwnerId,
  createProduct,
  updateShopBoat,
  getAllShopBoats,
  updateShopBoatById,
  getListCategoriesOfShop,
};
