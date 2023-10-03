import instance from "api/axios";

const getOrdersOfShop = (shopBoatId, page, limit, searchParams = {}) => {
  let url = `/shopBoats/${shopBoatId}/orders?page=${page}&limit=${limit}`;
  if (searchParams.customerName) {
    url += `&customerName=${searchParams.customerName}`;
  }
  if (searchParams.phoneNumber) {
    url += `&phoneNumber=${searchParams.phoneNumber}`;
  }
  if (searchParams.startDate) {
    url += `&startDate=${searchParams.startDate}`;
  }
  if (searchParams.endDate) {
    url += `&endDate=${searchParams.endDate}`;
  }
  if (searchParams.minValue) {
    url += `&minValue=${searchParams.minValue}`;
  }
  if (searchParams.maxValue) {
    url += `&maxValue=${searchParams.maxValue}`;
  }
  if (searchParams.address) {
    url += `&address=${searchParams.address}`;
  }
  if (searchParams.status) {
    url += `&status=${searchParams.status}`;
  }
  try {
    const response = instance.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const updateOrderStatus = (orderId, status) => {
  try {
    const response = instance.patch(`/orders/${orderId}`, { status });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { getOrdersOfShop, updateOrderStatus };
