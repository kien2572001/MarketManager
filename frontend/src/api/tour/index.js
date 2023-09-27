import instance from "api/axios";

const getAllTours = async (page, limit) => {
  try {
    const response = await instance.get(`/tours?page=${page}&limit=${limit}`);
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

export { getAllTours, updateTour, deleteTour };
