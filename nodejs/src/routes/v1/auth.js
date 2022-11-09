const express = require("express");
const mysql = require("mysql2/promise");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { dbconfig, jwtSecret } = require("../../config");

const router = express.Router();

const userSchema = Joi.object({
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
      `INSERT INTO users (email, password) values ( ${mysql.escape(
        userData.email
      )}, '${hashedPassword}')`
    );

    res.send(response[0]);
    await con.end();
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  let userData = req.body;

  try {
    userData = await userSchema.validateAsync(userData);
  } catch (e) {
    res.status(400).send({ error: "Incorect data " });
    console.log(e);
  }

  try {
    const con = await mysql.createConnection(dbconfig);

    const [response] = await con.execute(
      `SELECT * FROM users WHERE email = ${mysql.escape(userData.email)}`
    );

    await con.end();

    if (response.length === 0) {
      return res.status(400).send({ error: "Incorrect email" });
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

      res.send({ token, id: response[0].id });
    } else {
      res.status(400).send({ error: "Incorrect password" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({ error: "Server error" });
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

module.exports = router;
