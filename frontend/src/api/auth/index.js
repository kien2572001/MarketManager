import instance from "api/axios";
const signinService = async (email, password) => {
    const response = await instance.post('/auth/login', { email, password });
    return response;
}

const signupService = async (firstName, lastName, email, password) => {
  try{
    const response = await instance.post('/auth/register', { firstName, lastName, email, password });
    return response;
  }
  catch(error){
    console.log(error);
  }
}

export { signinService, signupService };