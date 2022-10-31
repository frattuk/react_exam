const express = require("express");
const cors = require("cors");

const { port } = require("./config");
const { auth, content } = require("./routes/v1");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", auth);
app.use("/content/", content);

app.get("/api", (req, res) => {
  res.send({ msg: "Server is running" });
});

// http://localhost:3001/questions - GET, POST
// http://localhost:3001/questions/user/:id  - GET
// http://localhost:3001/questions/:id - DELETE
// http://localhost:3001/auth - POST for login session ???

app.all("*", (req, res) => {
  res.status(404).send({ error: "Page not found" });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
