/** @format */

const express = require("express");

const { getListProduct } = require("../controllers/product");
const {
  addBasket,
  getBasket,
  updateBasket,
  deleteBasket,
} = require("../controllers/basket");
const wrap = require("../helpers/wrapper");
const router = express.Router();

router.get("/products", wrap(getListProduct));

router.get("/basket", wrap(getBasket));
router.post("/basket", wrap(addBasket));
router.put("/basket/:id", wrap(updateBasket));
router.delete("/basket/:id", wrap(deleteBasket));

module.exports = router;