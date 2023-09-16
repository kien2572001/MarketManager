const express = require("express");
const serverResponses = require("../utils/helpers/responses");
const messages = require("../config/messages");
var authHandlers = require("../controllers/authController.js");
var userHandlers = require("../controllers/userController.js");
var shopBoatHandlers = require("../controllers/shopBoatController.js");
var categoryHandlers = require("../controllers/categoryController.js");
var productHandlers = require("../controllers/productController.js");
import jwt from "jsonwebtoken";

const authorization = (req, res, next) => {
  console.log("authorization");
  const accessToken = req.cookies["access_token"];
  if (!accessToken) {
    return serverResponses.sendError(res, messages.UNAUTHORIZED);
  }
  try {
    console.log("try");
    const data = jwt.verify((accessToken, "ACCESS_TOKEN_PRIVATE_KEY"));
    console.log(data);
    req.userId = data.id;
    req.userRole = data.role;
    return next();
  } catch (error){
    console.log("catch");
    console.log("Error:", error);
    return serverResponses.sendError(res, messages.UNAUTHORIZED);
  }
};

const routes = (app) => {
  const router = express.Router();

  router.post("/auth/register", authHandlers.register);
  router.post("/auth/login", authHandlers.login);
  router.get("/auth/logout", authorization ,authHandlers.logout);

  router.get("/users", userHandlers.getAllUsers);
  router.get("/users/:id", userHandlers.getUserById);

  router.get("/shopBoats", shopBoatHandlers.getAllShopBoats);
  router.get("/shopBoats/:id", shopBoatHandlers.getShopBoatById);
  router.get("/shopBoats/:id/products", shopBoatHandlers.getShopBoatProducts);

  router.get("/products",productHandlers.getAllProducts);
  router.get("/products/:id", productHandlers.getProductById);
  router.delete("/products/:id", productHandlers.deleteProductById);
  router.put("/products/:id", productHandlers.updateProductById);

  router.get("/categories/list", categoryHandlers.getListCategories);
  router.get("/categories", categoryHandlers.getAllCategories);
  router.get("/categories/:slug", categoryHandlers.getCategoryBySlug);
  router.post("/categories", categoryHandlers.createCategory);


  //it"s a prefix before api it is useful when you have many modules and you want to
  //differentiate b/w each module you can use this technique
  app.use("/api", router);
};
module.exports = routes;
