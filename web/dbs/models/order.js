const mongoose =  require('mongoose');

let orderSchema =  new mongoose.Schema({
    name:String,
    pname:String,
    p_user_id:String ,
    user_id:String,
    product_type:Number,
    age:Number
})

module.exports = mongoose.model('order',orderSchema);