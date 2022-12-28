const mongoose = require('mongoose');



const productModel = new mongoose.Schema({
      name:{
        type:String,
        required:[true,"Please inter your product name"],
        trim:true
      },
      description:{
        type:String,
        required:[true,"Please Inter your product Description"]
      },
      price:{
        type:Number,
        required:[true,"Please inter your product price"],
        maxlength:[8,"product price can not exced 8 characters"]
      },
      rating:{
        type:Number,
        default:0
      },
      image:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
      ],
      category:{
        type:String,
        required:[true,"Please inter your product category"]
      },
      stock:{
        type:Number,
        required:[true,"Please inter your product stock"],
        maxlength:[6,"product stock can't exced 6 characters"],
        default:1
      },
      numberOfReviews:{
        type:Number,
        default:0
      },
      reviews:[
        {
            user:{
                type:mongoose.Types.ObjectId,
                ref:"User",
                required:true
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
      ],
      user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
      },
      createdAt:{
        type:Date,
        default:Date.now()
      }
})

module.exports = mongoose.model('Product',productModel);