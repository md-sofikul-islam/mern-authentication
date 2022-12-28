const express = require('express');
const app = express();
//==========import middleware ===
const errorMiddleware = require("./middleWare/error")
//======= USE EXPRESS JSON=====//
app.use(express.json());


const productRoutes = require("./routes/productRoute")
//========ALL ROUTES HERE=======//

//======product routes=====//
app.use("/api/v1",productRoutes)


//============ middleware ====//
app.use(errorMiddleware)





module.exports = app