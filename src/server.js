const express = require("express");
const router = require("./routes/Routes");
const app = express();

require('dotenv').config();

app.use(express.json())

app.use('/api', router)

const port = process.env.PORT | 7777;

app.listen(port, () => {
    console.log("estamos online")
})
