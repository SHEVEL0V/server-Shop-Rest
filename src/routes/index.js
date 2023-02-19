/** @format */

const express = require("express");

const {
  getListProduct,
  getProductById,
  addProduct,
  deleteProductsAll,
} = require("../controllers/product");
const { addImage } = require("../controllers/image");

const { getOrder, addOrder } = require("../controllers/orders");
const { registerUser, loginUser } = require("../controllers/user");

const wrap = require("../helpers/wrapper");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");
const multer = require("../middlewares/upload");

const router = express.Router();

//---------------------------------------------------------
router.get("/products", wrap(getListProduct));
router.get("/products/:id", wrap(getProductById));
router.post("/products", authAdmin, wrap(addProduct));
router.put("/products/all", authAdmin, wrap(deleteProductsAll));

//----------------------------------------------------------
router.post("/images", authAdmin, multer.single("image"), wrap(addImage));
//----------------------------------------------------------
router.get("/order", authAdmin, wrap(getOrder));
router.post("/order", auth, wrap(addOrder));
// router.put("/basket/:id", auth, wrap(updateBasket));
// router.delete("/basket/:id", auth, wrap(deleteBasket));
// router.delete("/basket/all/:id", auth, wrap(deleteBasketAll));

//----------------------------------------------------------
router.post("/user/auth", wrap(registerUser));
router.post("/user/login", wrap(loginUser));

module.exports = router;
