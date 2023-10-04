import instance from "api/axios";

const getAllTours = async (page, limit, queryCondition = {}) => {
  let url = `/tours?page=${page}&limit=${limit}`;
  if (queryCondition.name) {
    url += `&name=${queryCondition.name}`;
  }
  if (queryCondition.minPrice) {
    url += `&minPrice=${queryCondition.minPrice}`;
  }
  if (queryCondition.maxPrice) {
    url += `&maxPrice=${queryCondition.maxPrice}`;
  }

  try {
    const response = await instance.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const addTour = async (data) => {
  try {
    const response = await instance.post("/tours", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateTour = async (id, data) => {
  try {
    const response = await instance.patch(`/tours/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteTour = async (id) => {
  try {
    const response = await instance.delete(`/tours/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getBestSalerToursInHomePage = async () => {
  try {
    const response = await instance.get("/customer/tours");
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getTourBySlug = async (slug) => {
  try {
    const response = await instance.get(`/customer/tours/${slug}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const searchTour = async (page, limit, queryCondition = {}) => {
  let url = `/customer/tours/search?page=${page}&limit=${limit}`;
  if (queryCondition.name) {
    url += `&name=${queryCondition.name}`;
  }
  if (queryCondition.minPrice) {
    url += `&minPrice=${queryCondition.minPrice}`;
  }
  if (queryCondition.maxPrice) {
    url += `&maxPrice=${queryCondition.maxPrice}`;
  }
  try {
    const response = await instance.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {
  getAllTours,
  updateTour,
  deleteTour,
  addTour,
  getBestSalerToursInHomePage,
  getTourBySlug,
  searchTour,
};
