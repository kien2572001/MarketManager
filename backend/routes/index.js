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
  const token = req.cookies.access_token;
  if (!token) {
    return serverResponses.sendError(res, messages.UNAUTHORIZED);
  }
  try {
    const data = jwt.verify(token, "RESTFULAPIs");
    req.userId = data.id;
    req.userRole = data.role;
    return next();
  } catch {
    return serverResponses.sendError(res, messages.UNAUTHORIZED);
  }
};




const routes = (app) => {
  const router = express.Router();

  router.post("/auth/register", authHandlers.register);
  router.post("/auth/login", authHandlers.login);
  router.get("/auth/logout", authorization ,authHandlers.logout);

  router.get("/users", authorization ,userHandlers.getAllUsers);
  router.get("/users/:id", authorization ,userHandlers.getUserById);

  router.get("/shopBoats", authorization ,shopBoatHandlers.getAllShopBoats);
  router.get("/shopBoats/:id", authorization ,shopBoatHandlers.getShopBoatById);
  router.get("/shopBoats/:id/products", authorization ,shopBoatHandlers.getShopBoatProducts);

  router.get("/products", authorization ,productHandlers.getAllProducts);
  router.get("/products/:id", authorization ,productHandlers.getProductById);
  router.delete("/products/:id", authorization ,productHandlers.deleteProductById);

  router.get("/categories", authorization ,categoryHandlers.getAllCategories);
  router.get("/categories/:slug", authorization ,categoryHandlers.getCategoryBySlug);
  router.post("/categories", authorization ,categoryHandlers.createCategory);


  //it"s a prefix before api it is useful when you have many modules and you want to
  //differentiate b/w each module you can use this technique
  app.use("/api", router);
};
module.exports = routes;
