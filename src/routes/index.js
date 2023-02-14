/** @format */

const express = require("express");

const { getListProduct, getProductById } = require("../controllers/product");
const {
  addBasket,
  getBasket,
  updateBasket,
  deleteBasket,
} = require("../controllers/basket");
const { registerUser } = require("../controllers/user");

const wrap = require("../helpers/wrapper");
const auth = require("../middlewares/auth");

const router = express.Router();

//---------------------------------------------------------
router.get("/products", wrap(getListProduct));
router.get("/products/:id", wrap(getProductById));

//----------------------------------------------------------
router.get("/basket", wrap(getBasket));
router.post("/basket", auth, wrap(addBasket));
router.put("/basket/:id", wrap(updateBasket));
router.delete("/basket/:id", wrap(deleteBasket));

//----------------------------------------------------------
router.post("/user", wrap(registerUser));

module.exports = router;
