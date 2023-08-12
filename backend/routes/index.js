const express = require("express");
const serverResponses = require("../utils/helpers/responses");
const messages = require("../config/messages");
var authHandlers = require("../controllers/authController.js");
var userHandlers = require("../controllers/userController.js");
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
  router.get('/auth/logout', authorization ,authHandlers.logout);

  router.get('/users/{id}', authorization ,userHandlers.getUserById);

  //it's a prefix before api it is useful when you have many modules and you want to
  //differentiate b/w each module you can use this technique
  app.use("/api", router);
};
module.exports = routes;
