const ErrorHandler = require("../utils/errorHandler")


module.exports = (err,req,res,next) =>{
      err.statusCode = err.statusCode || 500;
      err.message = err.message || "Internal Server Error";


      //========for casterror========= check product id
      if(err.name === "CastError"){
            const message = `Recsouse not found.invalid ${err.path}`;
            err = new ErrorHandler(message,400)
      }



      res.status(err.statusCode).json({
            success:false,
            message:err.message
      })
}