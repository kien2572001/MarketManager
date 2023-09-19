var mongoose = require("mongoose"),
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcrypt"),
  User = mongoose.model("User");

import generateTokens from "../utils/helpers/generateTokens";
import Token from "../models/tokenModel";
import { ROLES } from "../enum/enum";
import ShopBoat from "../models/shopBoatModel";

exports.register = async function (req, res) {   
  console.log(req.body); 
  let user  = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    role: req.body.isSeller ? ROLES.MERCHANT : ROLES.CUSTOMER,
  }

  const isEmailExist = await User.findOne({ email: req.body.email });
  console.log(isEmailExist);
  if (isEmailExist) {
    return res.status(400).json({
      message: "Email already exists 😢 😢",
    });
  }


  user.hash_password = bcrypt.hashSync(req.body.password, 10);
  User.create(user, function (err, user) {
      if (user.role === ROLES.MERCHANT){
        const shopBoat = {
          name: "Cua hang cua " + user.firstName + " " + user.lastName,
          owner: user._id,
          avatar: "https://s3.nucuoimekong.com/ncmk/wp-content/uploads/dac-san-mien-tay.jpg",
          description: "Hay viet mot vai dong gioi thieu ve cua hang cua ban nhe",
          address: "Dia chi cua hang",
        };
        ShopBoat.create(shopBoat, function (err, shopBoat) {
          if (err) {
            return res.status(400).json({
              message: "Something went wrong 😢 😢",
            });
          }
          user.hash_password = undefined;
          return res.status(201).json({ message: "User created successfully 😊 👌" });
        });
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
        .json({ message: "Logged in successfully 😊 👌", accessToken });
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
