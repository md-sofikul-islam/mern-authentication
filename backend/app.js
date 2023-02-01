const express = require('express');
const app = express();
// EIGHT //
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
//==========import middleware ===
const errorMiddleware = require("./middleWare/error")
//======= USE EXPRESS JSON=====//
app.use(express.json());

// NINE //
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const userRoutes = require('./routes/userRoute');







//============= user routes========//
app.use("/api/v1",userRoutes)


//============ middleware ====//
app.use(errorMiddleware)





module.exports = app