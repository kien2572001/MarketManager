import instance from "api/axios";

const getAllTourOrders = async (page, limit, queryCondition = {}) => {
  let url = `/tour-orders?page=${page}&limit=${limit}`;
  try {
    const response = await instance.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateTourOrder = async (tourOrderId, tourOrderData) => {
  let url = `/tour-orders/${tourOrderId}`;
  try {
    const response = await instance.put(url, tourOrderData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const changeStatus = async (tourOrderId, status) => {
  let url = `/tour-orders/${tourOrderId}/status`;
  try {
    const response = await instance.patch(url, { status: status });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getAllTourOrders, updateTourOrder, changeStatus };
