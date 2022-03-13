const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
userID :{
type: String,
required: true,
unique: true,
},
Name:{
    type: String,
    required: true,
    },
email:{
type: String,
required: true,
},
password:{
type: String,
required: true,

},

});
const user = mongoose.model('user',userSchema)
module.exports = user ;