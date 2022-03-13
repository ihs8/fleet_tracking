const express = require('express');
const mongoose = require('mongoose');
const device = require("./models/device");
const bodyParser= require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//for login system

app.use(require("express-session")({
   secret: "node js mongodb",
   resave: false,
   saveUninitialized: false
   }));
   app.use(passport.initialize());
   app.use(passport.session());
   passport.use(new LocalStrategy(User.authenticate()));
   passport.serializeUser(User.serializeUser());
   passport.deserializeUser(User.deserializeUser());


// This GET DEVICES 
app.get('/get_devices', async (req, res)=>{
   try{
      await device.find({}).then((result)=>{
         res.send(result);
      });
  }   catch (err) {
      console.log(err);
   }
});
// This ADD DEVICE 
app.post('/add_device', async (req, res)=> {
   try {
      let new_device = new device ({
         deviceID :req.body.deviceID ,
         simNum: req.body.simNum,
         loginKey:req.body.loginKey,
   
      });
      await new_device.save()
      res.send('device added !')   
   } catch (err) {
      console.log(err);
      
   }
   
   
})

// This responds a DELETE request for the /del_user page.
app.delete('/delete_device/:deviceID', async (req, res) => {
   try {
      await device.findOneAndDelete({ deviceID:req.params.deviceID});
      res.send("device is deleted !")
   } catch (err) {
      res.send(err);
      
   }
})


// This GET Device INFO
app.get('/get_deviceinfo/:deviceID', async (req, res) =>{

   try {
      await device.findOne({deviceID: req.params.deviceID}, async(err,result)=> {
         if(err){
            console.log(err)
         }if(result){
            res.send(result)
         }
      })
   } catch (error) {
      console.log(error);
      
   }
      
});


// This responds a POST request for the homepage
app.post('/login', function (req, res) {
   console.log("Got a POST request for the homepage");
   res.send('Hello POST');
})


mongoose.connect('mongodb+srv://fleet:tracking@cluster0.vfkzj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
(err,done)=>{
if(err)
{console.log(err)}
if (done){
   console.log('DB connected !')
}


});
app.listen(5010,() => console.log("server activate"));
