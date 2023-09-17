var mongoose = require("mongoose"),
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcrypt"),
  User = mongoose.model("User");

import generateTokens from "../utils/helpers/generateTokens";
import Token from "../models/tokenModel";

exports.register = function (req, res) {
  var newUser = new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  newUser.save(function (err, user) {
    if (err) {
      return res.status(400).send({
        message: err,
      });
    } else {
      user.hash_password = undefined;
      return res.json(user);
    }
  });
};

exports.login = async (req, res) =>{
  User.findOne(
    {
      email: req.body.email,
    },
    async function (err, user) {
      if (err) throw err;
      if (!user || !user.comparePassword(req.body.password)) {
        return res
          .status(401)
          .json({
            message: "Email or password is incorrect 😢 😢"
          });
      }
      const { accessToken, refreshToken } = await generateTokens(user);
      user.hash_password = undefined;
      return res
        .cookie("refresh_token", refreshToken, { httpOnly: true, secure: false })
        .cookie("access_token", accessToken, { httpOnly: false, secure: false })
        .status(200)
        .json({ message: "Logged in successfully 😊 👌" });
    }
  );
};

exports.logout = function (req, res) {

  let refresh_token = req.cookies.refresh_token;
  if (refresh_token){
    Token.deleteOne({ token: refresh_token }, (err, doc) => {
      if (err) {
        return res.status(400).json({
          message: "Something went wrong 😢 😢",
        });
      }
    }
    );
  }

  return res
    .clearCookie("refresh_token")
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Logged out successfully 😊 👌" });
};

exports.loginRequired = function (req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized user!!" });
  }
};

exports.profile = function (req, res, next) {
  if (req.user) {
    res.send(req.user);
    next();
  } else {
    return res.status(401).json({ message: "Invalid token" });
  }
};
