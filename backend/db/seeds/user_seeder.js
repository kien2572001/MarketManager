import User from "../../models/userModel.js";
import {ROLES} from "../../enum/enum.js"
const { faker } = require('@faker-js/faker');
let users = [];

const insertUser = async () => {
  // add 1 admin
  users.push({
    firstName: "admin",
    lastName: "admin",
    email: "admin@gmail.com",
    hash_password: "$2b$10$BHm3/TU0/QuK6JudqCRBzufCN8o.4SIeUVj/3oloENWyUWZi/sb3i",
    avatar: faker.image.avatar(),
    role: ROLES.ADMIN,
  })

  // add 5 merchant
  for (let i=0; i < merchants.length; i++) {
    users.push({
      firstName: merchants[i].firstName,
      lastName: merchants[i].lastName,
      email: "merchant" + i + "@gmail.com",
      hash_password: "$2b$10$BHm3/TU0/QuK6JudqCRBzufCN8o.4SIeUVj/3oloENWyUWZi/sb3i",
      avatar: faker.image.avatar(),
      role: ROLES.MERCHANT,
    })
  }

  // add 100 customer
  for (let i = 0; i <= 100; i++) {
    users.push({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: "customer" + i + "@gmail.com",
      hash_password: "$2b$10$BHm3/TU0/QuK6JudqCRBzufCN8o.4SIeUVj/3oloENWyUWZi/sb3i",
      avatar: faker.image.avatar(),
      role: ROLES.CUSTOMER,
    })
  }

  try {
    await User.insertMany(users);
    console.log("Users are inserted");
  }
  catch (err) {
    console.log(err);
  }
}

let merchants = [
  {
    firstName: "Long",
    lastName: "Nguyen Van",
  },
  {
    firstName: "Huy",
    lastName: "Trinh Quang",
  },
  {
    firstName: "Hieu",
    lastName: "Vu Duc",
  },
  { 
    firstName: "Hai",
    lastName: "Nguyen Van",
  },
  {
    firstName: "Hoa",
    lastName: "Nguyen Thi",
  },
];

export default insertUser;
  