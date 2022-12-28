const app = require('./app');
const dotenv = require('dotenv');
const Database_Connection = require('./config/database');


//=============uncought exception=============//
process.on("uncaughtException",(err) =>{
     console.log(`Error: ${err.message}`);
     console.log("shutting down the server due to uncought exception");
     process.exit(1);
})




//====CONFIG DOTENV=====//
dotenv.config({path:"backend/config/config.env"})

//======= DATABASE CONNECTION FUNCTION=======//
Database_Connection();




app.listen(process.env.PORT,(req,res,next) =>{
     console.log(`Server is working port on http://localhost:${process.env.PORT}`)
})









//===========unhandled promise rejection======//
process.on("unhandledRejection",(err)=>{
      console.log(`Error:${err.message}`);
      console.log("shutting down the server due to unhandled promise rejection");

      server.close(() =>{
          process.exit(1);
      })
});