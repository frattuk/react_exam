const express = require("express");
const mysql = require("mysql2/promise");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { dbconfig, jwtSecret } = require("../../config");
const router = express.Router();

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().required(),
});

router.post("/registration", async (req, res) => {
  let userData = req.body;
  try {
    userData = await userSchema.validateAsync(userData);
  } catch (e) {
    res.status(400).send({ error: "Incorrect data send" });
  }

  try {
    const hashedPassword = bcrypt.hashSync(userData.password);
    const con = await mysql.createConnection(dbconfig);

    const response = await con.execute(
      `INSERT INTO users (name, email, password) values (${mysql.escape(
        userData.name
      )}, ${mysql.escape(userData.email)}, '${hashedPassword}')`
    );

    res.send(response[0]);
    await con.end();
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Server error" });
  }
});
router.get("/login", async (req, res) => {
  let userData = req.body;
  try {
    userData = await userSchema.validateAsync(userData);
  } catch (e) {
    res.status(400).send({ error: "Incorect data " });
  }
  try {
    const con = await mysql.createConnection(dbconfig);
    const [response] = await con.execute(
      `SELECT * FROM users WHERE email = ${mysql.escape(userData.email)}`
    );
    await con.end();
    if (response.length === 0) {
      res.status(400).send({ error: "Incorrect email" });
    }
    const isAuthed = bcrypt.compareSync(
      userData.password,
      response[0].password
    );
    if (isAuthed) {
      const token = jwt.sign(
        { id: response[0].id, email: response[0].email },
        jwtSecret
      );
      res.send({ token });
    } else {
      res.status(400).send({ error: "Incorrect password" });
    }
  } catch (e) {
    res.status(500).send({ error: "Server error" });
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const response = await con.execute(
      `SELECT * FROM users WHERE id=${req.params.id};`
    );
    res.send(response[0]);
    await con.end();
  } catch (e) {
    console.log(e);
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
