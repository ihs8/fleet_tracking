const mongoose = require('mongoose')
const deliverySchema = mongoose.Schema({
deliveryID :{
type: String,
required: true,
unique: true,
},
store:{
type: String,
required: true,
},
product:{
    type:String,
    required: true
},
quantity:{
    type:Number,
    required:true
}
})
const delivery = mongoose.model('delivery',deliverySchema)
module.exports = delivery ;