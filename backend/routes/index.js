const express = require("express");
const serverResponses = require("../utils/helpers/responses");
const messages = require("../config/messages");
var authHandlers = require("../controllers/authController.js");
var userHandlers = require("../controllers/userController.js");
var shopBoatHandlers = require("../controllers/shopBoatController.js");
var categoryHandlers = require("../controllers/categoryController.js");
var productHandlers = require("../controllers/productController.js");
var productOrderHandlers = require("../controllers/productOrderController.js");
var tourHandlers = require("../controllers/tourController.js");
var tourOrderHandlers = require("../controllers/tourOrderController.js");
import jwt from "jsonwebtoken";
import ShopBoat from "../models/shopBoatModel";

const authorization =  (req, res, next) => {
  console.log("authorization");
  const accessToken = req.cookies["access_token"];
  if (!accessToken) {
    return serverResponses.sendError(res, messages.UNAUTHORIZED);
  }
  try {
    const data = jwt.verify(accessToken, "ACCESS_TOKEN_PRIVATE_KEY");
    req.userId = data.id;
    req.userRole = data.role;
    return next();
  } catch (error){ 
    console.log("catch");
    console.log("Error:", error);
    return serverResponses.sendError(res, messages.UNAUTHORIZED);
  }
};

const merchantAuthorization = async (req, res, next) => {
  const accessToken = req.cookies["access_token"];
  if (!accessToken) {
    return serverResponses.sendError(res, messages.UNAUTHORIZED);
  }
  try {
    const data = jwt.verify(accessToken, "ACCESS_TOKEN_PRIVATE_KEY");
    req.userId = data.id;
    req.userRole = data.role;
    if (req.userRole !== 1) {
      return serverResponses.sendError(res, messages.UNAUTHORIZED);
    }
    else {
      const shopBoat = await ShopBoat.findOne({ owner: req.userId });
      
      req.shopBoatId = shopBoat._id;
    }
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
  router.get("/users/:id/shopBoat", shopBoatHandlers.getShopBoadByOwnerId);

  router.get("/shopBoats", shopBoatHandlers.getAllShopBoats);
  router.get("/shopBoats/:id", shopBoatHandlers.getShopBoatById);
  router.get("/shopBoats/:id/products", merchantAuthorization, shopBoatHandlers.getShopBoatProducts);
  router.put("/shopBoats/:id",  shopBoatHandlers.updateShopBoatById);
  router.put("/shopBoats", merchantAuthorization, shopBoatHandlers.updateShopBoat );
  router.get("/shopBoats/:id/orders", productOrderHandlers.getAllOrdersOfShop);
  router.get("/shopBoats/:id/categories",  shopBoatHandlers.getListCategoriesOfShop);
  router.patch("/orders/:id", productOrderHandlers.updateOrderStatus);

  router.get("/products",productHandlers.getAllProducts);
  router.get("/products/top4", productHandlers.getTop4Products);
  router.get("/products/homepage", productHandlers.getListProductsInHomePage);
  router.get("/products/:slug", productHandlers.getProductBySlug);
  router.delete("/products/:id", productHandlers.deleteProductById);
  router.put("/products/:id", productHandlers.updateProductById);
  router.post("/products", merchantAuthorization, productHandlers.createProduct);

  router.get("/categories/list", categoryHandlers.getListCategories);
  router.get("/categories", categoryHandlers.getAllCategories);
  router.get("/categories/id/:id", categoryHandlers.getCategoryById);
  router.get("/categories/:slug", categoryHandlers.getCategoryBySlug);
  router.post("/categories", categoryHandlers.createCategory);

  router.get("/tours", tourHandlers.getAllTours);
  router.post("/tours", tourHandlers.addTour);
  router.patch("/tours/:id", tourHandlers.updateTour);
  router.delete("/tours/:id", tourHandlers.deleteTour);

  //customer
  router.get("/customer/tours", tourHandlers.getToursInHomePage);
  router.get("/customer/tours/search", tourHandlers.searchTour);
  router.get("/customer/tours/:slug", tourHandlers.getTourBySlug);

  router.get("/customer/products/search", productHandlers.searchProduct);
  router.get("/customer/products/category/:slug", productHandlers.getProductByCategory);
  

  router.get("/tour-orders", tourOrderHandlers.getTourOrders);
  router.patch("/tour-orders/:id", tourOrderHandlers.updateTourOrder);
  router.patch("/tour-orders/:id/status", tourOrderHandlers.changeStatus);




  //it"s a prefix before api it is useful when you have many modules and you want to
  //differentiate b/w each module you can use this technique
  app.use("/api", router);
};
module.exports = routes;
