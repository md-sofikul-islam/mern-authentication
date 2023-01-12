const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please inter user name'],
        maxlength:[30,'name cannot exced 30 characters'],
        minlength:[4,'name should have more then 4 characters']
    },


    email:{
        type:String,
        required:[true,'Please inter your email'],
        unique:true,
        validate:[validator.isEmail,'Please inter currect email']
    },
    password:{
        type:String,
        required:[true,'please inter your password'],
        minlength:[8,'Password should have more then 8 characters'],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user"
    },

    createdAt:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date


});


// FIRST //

//============== hashing user password using bcrypt==========//
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10) 
});




// SECOND //

//=========== generate JWTToken =======//

userSchema.methods.getJWTtoken = function(){
   return  JWT.sign({id:this._id},process.env.JWT_SECRET,{
      expiresIn:process.env.JWT_EXPIRE,
   });
}


// FIVE //
//============ compare old password with login password =====//
userSchema.methods.comparePassword = async  function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}

























module.exports = mongoose.model('User',userSchema);