/** @format */

const express = require("express");

const {
  getListProduct,
  getProductById,
  addProduct,
  deleteProductsAll,
} = require("../controllers/product");
const { addImage } = require("../controllers/image");

const {
  addBasket,
  getBasket,
  updateBasket,
  deleteBasket,
  deleteBasketAll,
} = require("../controllers/basket");
const { registerUser, loginUser } = require("../controllers/user");

const wrap = require("../helpers/wrapper");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/upload");

const router = express.Router();

//---------------------------------------------------------
router.get("/products", wrap(getListProduct));
router.get("/products/:id", wrap(getProductById));
router.post("/image", multer.single("image"), wrap(addImage));
router.post("/products", auth, wrap(addProduct));
router.put("/products/all", auth, wrap(deleteProductsAll));

//----------------------------------------------------------
router.get("/basket", auth, wrap(getBasket));
router.post("/basket", auth, wrap(addBasket));
router.put("/basket/:id", auth, wrap(updateBasket));
router.delete("/basket/:id", auth, wrap(deleteBasket));
router.delete("/basket/all/:id", auth, wrap(deleteBasketAll));

//----------------------------------------------------------
router.post("/user/auth", wrap(registerUser));
router.post("/user/login", wrap(loginUser));

module.exports = router;
