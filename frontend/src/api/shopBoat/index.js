import instance from "api/axios";

const getShopBoatProducts = async (id, page = 1, limit = 10) => {
  try {
    const response = await instance.get(
      `/shopBoats/${id}/products?page=${page}&limit=${limit}`
    );
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

const getShopBoatByOwnerId = async (id) => {
  try {
    const response = await instance.get("/users/" + id + "/shopBoat");
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
};
