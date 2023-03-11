/** @format */

const express = require("express");

const product = require("../controllers/product/");
const { addRating } = require("../controllers/rating");
const order = require("../controllers/orders");
const user = require("../controllers/user");

const wrap = require("../helpers/wrapper");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

const multer = require("../middleware/upload");
const router = express.Router();

//-------------PRODUCTS--------------------------------------------
router.get("/products", wrap(product.getList));
router.get("/products/options", wrap(product.getOptions));
router.get("/products/:id", wrap(product.getById));
router.post("/products", authAdmin, multer.single("img"), wrap(product.add));
router.put("/products/all", authAdmin, wrap(product.deleteAll));
router.put(
  "/products/:id",
  authAdmin,
  multer.single("img"),
  wrap(product.update)
);

//-------------ORDER--------------------------------------------
router.get("/order", authAdmin, wrap(order.get));
router.post("/order", auth, wrap(order.add));
router.put("/order", authAdmin, wrap(order.update));

//-------------USER---------------------------------------------
router.post("/user/auth", wrap(user.register));
router.post("/user/login", wrap(user.login));
router.post("/user/login/google", wrap(user.authGoogle));
router.put("/user/update", auth, multer.single("img"), wrap(user.update));

//-------------RATING--------------------------------------------
router.post("/rating", auth, wrap(addRating));

module.exports = router;
