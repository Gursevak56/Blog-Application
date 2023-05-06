const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyparser = require('body-parser');
dotenv.config({ path: "./config/config.env" });
const userrouter = require('./routes/userroute');
const blogrouter = require('./routes/blogroute');
const app = express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());
app.use(bodyparser.json());
const port = process.env.PORT;
const db_url = process.env.DB_URL;
//Database connectivity
mongoose
    .connect(db_url, { useNewUrlParser: true })
    .then((conn) => {
        console.log("database connected successfully");
    })
    .catch((err) => {
        console.log("database connectivity failed");
    });

app.use('/userapi',userrouter);
app.use('/blogapi',blogrouter);
app.listen(port, () => console.log(`app listening on port ${port}!`));
