const express = require("express");
const mysql = require("mysql2/promise");
// const Joi = require("joi");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const { dbconfig } = require("../../config");
// const { isLoggedIn } = require("../../middleware");

const router = express.Router();

// const userSchema = Joi.object({
//   email: Joi.string().email().trim().lowercase().required(),
//   password: Joi.string().required(),
// });

router.get("/questions", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const [response] = await con.execute("SELECT * FROM questions");
    await con.end();
    res.send(response);
  } catch (e) {
    res.status(400).send({ error: "Error" });
  }
});

router.post("/questions", async (req, res) => {
  try {
    const question = req.body;
    if (question.user_id && question.question) {
      const con = await mysql.createConnection(dbconfig);

      const [response] = await con.execute(
        `INSERT INTO questions (user_id, question) values (${con.escape(
          question.user_id
        )}, ${con.escape(question.question)})`
      );

      res.send(response);
      await con.end();
    } else {
      res.status(400).send("Bad syntax");
    }
  } catch (error) {
    console.error(error);
  }
});

router.delete("/questions/:id", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const response = await con.execute(
      `DELETE FROM questions WHERE id=${req.params.id};`
    );
    res.send(response[0]);
    await con.end();
  } catch (e) {
    console.log(e);
  }
});

router.get("/answers", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const [response] = await con.execute("SELECT * FROM answers");
    await con.end();
    res.send(response);
  } catch (e) {
    res.status(400).send({ error: "Error" });
  }
});

router.post("/answers", async (req, res) => {
  try {
    const answer = req.body;
    if (answer.user_id && answer.answer) {
      const con = await mysql.createConnection(dbconfig);

      const [response] = await con.execute(
        `INSERT INTO answers (user_id, answer) values (${con.escape(
          answer.user_id
        )}, ${con.escape(answer.answer)})`
      );
      res.send(response);
      await con.end();
    } else {
      res.status(400).send("Bad syntax");
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
