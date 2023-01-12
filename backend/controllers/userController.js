const catchAsyncError = require('../middleWare/catchAsyncErrors')
const  User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/JWTtoken')


//==========Register a User ======//

exports.registerUser= catchAsyncError( async (req,res,next) =>{
       const {name,email,password} = req.body;
       const user = await User.create({
           name,
           email,
           password,
           avatar:{
              public_id:"this is image public id",
              url:"this is image url"
           }
       });
       // THIRD //
       
    //   const token = await user.getJWTtoken();

    //   res.status(200).json({
    //      success:true,
    //      token
    //   })
       
       // SIX //
       sendToken(user,200,res)
});


// FOUR  //
//=================Login user =========//

exports.loginUser = catchAsyncError(async(req,res,next) =>{
      const {email,password} = req.body;
      
      if(!email || !password){
        return next(new ErrorHandler('please inter email and password'),400);
      }

      const user = await User.findOne({ email }).select("+password");
      if(!user){
        return next(new ErrorHandler('invalid email and password'),401);
      }

      const isPasswordMatch = await user.comparePassword(password);

      if(!isPasswordMatch){
         return next(new ErrorHandler('invalid email or password'),400);
      }

     sendToken(user,200,res)

});




