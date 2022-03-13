const mongoose = require('mongoose')
const storeSchema = mongoose.Schema({
storeID :{
type: String,
required: true,
unique: true,
},
name:{
type: String,
required: true,
},
type:{
    type:String,
    required: true
}
})
const store = mongoose.model('store',storeSchema)
module.exports = store ;