const express = require("express");
const app = express();

require('dotenv').config();

app.get("/", (req, res) => {
    res.send('salve zé')
});

try {
    app.listen(process.env.PORT)
    console.log(`Servidor on, localhost:${process.env.PORT}`)
} catch (error) {
    console.error(`Error on upload Server, Description: ${error}` )
}
