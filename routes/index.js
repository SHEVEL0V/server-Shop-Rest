/** @format */

const express = require("express");
const router = express.Router();
const { Card } = require("../db/schema");

/* GET home page. */
router.get("/", async function (req, res) {
  res.render("index", { title: "Express" });
  // const type = new Type({ id: "1", name: "bob" });
  // await type.save();
});

module.exports = router;
