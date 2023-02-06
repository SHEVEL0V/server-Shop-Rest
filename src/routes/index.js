/** @format */

const express = require("express");
const { getListProduct } = require("../controllers/getListProduct");
const router = express.Router();

router.get("/products", getListProduct);

module.exports = router;
