import instance from "api/axios";

const getAllTourOrders = async (page, limit, queryCondition = {}) => {
  let url = `/tour-orders?page=${page}&limit=${limit}`;
  if (queryCondition.email) {
    url += `&email=${queryCondition.email}`;
  }
  if (queryCondition.tourName) {
    url += `&tourName=${queryCondition.tourName}`;
  }
  if (queryCondition.departureStartDate) {
    url += `&departureStartDate=${queryCondition.departureStartDate}`;
  }
  if (queryCondition.departureEndDate) {
    url += `&departureEndDate=${queryCondition.departureEndDate}`;
  }
  if (queryCondition.totalBillMin) {
    url += `&totalBillMin=${queryCondition.totalBillMin}`;
  }
  if (queryCondition.totalBillMax) {
    url += `&totalBillMax=${queryCondition.totalBillMax}`;
  }
  if (queryCondition.orderStatus) {
    url += `&status=${queryCondition.orderStatus}`;
  }
  if (queryCondition.bookingStartDate) {
    url += `&bookingStartDate=${queryCondition.bookingStartDate}`;
  }
  if (queryCondition.bookingEndDate) {
    url += `&bookingEndDate=${queryCondition.bookingEndDate}`;
  }
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
