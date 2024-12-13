const mongoose = require('mongoose');
const { Schema } = mongoose;
const productSchema = new Schema({
    title: {type:String, required:true, unique:true},
    description:{type:String, required:true},
    category: {type:String, required:true},
    rating:{type:Number,min:[0,"Wrong min rating"],max:[5,'Wrong max rating'],default:0},
    price:{type:Number,min:[0,"Wrong min price"],max:[10000,'Wrong max price']},
    discountPercentage:{type:Number,min:[0,"Wrong min discount"],max:[99,'Wrong max discount']},
    stock: {type:Number,min:[0,"Wrong min Stock"], default:0},
    brand: {type:String, required:true},
    images:{type:[String], required:true},
    thumbnail:{type:String, required:true},
    deleted:{type:Boolean,default:false}
  });

  exports.Product = mongoose.model('Product', productSchema);