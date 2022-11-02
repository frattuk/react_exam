const express = require("express");
const mysql = require("mysql2/promise");
const router = express.Router();
// const {dbconfig} = require('../config');

const { isLoggedIn } = require("../../middleware");

router.get("/", isLoggedIn, (req, res) => {
  res.send("all good");
});

module.exports = router;
