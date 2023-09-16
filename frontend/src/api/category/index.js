import instance from "api/axios";

const getListCategories = async () => {
  try {
    const response = await instance.get(`/categories/list`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { getListCategories };
