const express = require("express");
const passport = require("passport");
const router = express.Router();
const mongoose = require("mongoose");
const Cart = require("../models/cart.model.js");
const Product = require("../models/product.model.js");
const User = require("../models/user.model.js");
const { findByIdAndDelete } = require("../models/cart.model.js");
// Endpoints

router.get("/getAllProducts", (req, res) => {
  Product.find()
    .then((response) => res.json(response))
    .catch((err) => res.status(500).json(err));
});
router.get("/getOneProduct/:product_id", (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.product_id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Product.findById(req.params.product_id)
    .then((response) => res.json(response))
    .catch((err) => res.status(500).json(err));
});
router.post("/newProduct", (req, res) => {
  Product.create(req.body)
    .then((response) => res.json(response))
    .catch((err) => res.status(500).json(err));
});

router.put("/editProduct/:product_id", (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.product_id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Product.findByIdAndUpdate(req.params.product_id, req.body, { new: true })
    .then((response) => res.json(response))
    .catch((err) => res.status(500).json(err));
});

router.put("/wishlist/:user_id", (req, res) => {
  console.log(req.body.favId);
  User.findByIdAndUpdate(req.params.user_id, {
    $push: { fav: req.body.favId },
  });
});

// router.put("/wishlist/:user_id", (req, res) => {
//   const user_id = req.params.user_id;
//   User.findByIdAndUpdate(
//     user_id,
//     {
//       $push: { fav: req.body.product_id },
//     },
//     { new: true }
//   ).then((res) => console.log(res.fav));
// });

// router.put("/wishlist/:product_id", (req, res) => {
//   const username = req.body.username;
//   User.findOne({ username })
//     .then((res) => res.fav.push(req.params.product_id))
//     .then((res) => res.json(res))
//     .catch((err) => res.status(500).json(err));
// });

// router.put("/wishlist/:product_id", (req, res) => {
//   Product.findByIdAndUpdate(req.params.product_id, req.body)
//     .then((response) => response.fav.push(req.session.user.id))
//     .then((response) => {
//       res.json(response);
//     })
//     .catch((err) => res.status(500).json(err));
// });

module.exports = router;
