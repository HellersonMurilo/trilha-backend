const express = require("express");
const router = require("./routes/Routes");
const db = require("./database/database");
const cors = require('cors')
const app = express();

require("dotenv").config();

app.use(express.json());

app.use(cors())

app.use("/api", router);

const port = process.env.PORT | 7777;

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    db.sync({ alter: true });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.listen(port, () => {
  console.log("estamos online");
});
