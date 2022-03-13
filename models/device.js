const mongoose = require('mongoose')
const deviceSchema = mongoose.Schema({
deviceID :{
type: String,
required: true,
},
simNum:{
type: String,
required: true,
},
loginKey:{
type: String,
required: false,

},

});
const device = mongoose.model('device',deviceSchema)
module.exports = device ;