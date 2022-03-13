const express = require('express');
const mongoose = require('mongoose');
const device = require("./models/device");
const store=require("./models/store");
const bcrypt= require('bcrypt');
const QRScanner = require ('qr-code-scanner');
const jwt = require('jsonwebtoken');
const user = require("./models/user");
const delivery = require("./models/delivery");
const bodyParser= require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


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

app.post('/add_store', async (req, res)=> {
   try {
      let {ggmaps}=req.body.ggmaps
      let new_store = new store ({
         storeID :req.body.storeID ,
         name: req.body.name,
         type: req.body.type,
   
      });
      await new_store.save()
      res.send('store added !')   
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
app.post('/get_deliverys', async(req,res)=>{
   let {deliveryID} = req.body;

   delivery.find({deliveryID:req.body.deliveryID}).then(data => {
     try {
      if(data) {
         res.json({

            status:"success",
            data:data,
         })

      }
     } catch (error) {
        console.log(error)
     }
   })
      
})
app.post('/confirm_delivery', async(req,res)=>{
let
{qrcode}=req.body;

if (qrcode){
res.send('executed')
}else {
   res.send('error');
}/*
QRScanner.initiate({
   onResult: (result) => {res.send('executed',result); },
   onError: (err) => {res.send('error',err)},
   timeout: 10000,
});*/





})
app.get('/get_devices', async (req, res)=>{
   try{
      await device.find({}).then((result)=>{
         res.send(result);
      });
  }   catch (err) {
      console.log(err);
   }
});
// This ADD User 
app.post('/add_user', async (req, res)=> {
   
      bcrypt.hash(req.body.password,10, async(err,hashedPass) => {
         if(err){

            await res.json({
               error:err
            })
         }
      let new_user = new user ({
         userID :req.body.userID ,
         Name:req.body.Name,
         email: req.body.email,
         password:hashedPass,
   
      });

      await new_user.save()
      res.send('user added !')
   
      })
   
})
// This responds a POST request for the homepage
app.post('/login', function (req, res) {
   let {email,password} = req.body;
   email=email.trim();
   password=password.trim();

   if(email=="" || password=="") {
      res.json({
         status:"Failed",
         message:"Empty login"


      })
   }else {
      
      user.find({email:req.body.email}).then(data => {
         if(data) {
            bcrypt.compare(req.body.password, data[0].password,function(err, result) {

               if (result) {
                  let token = jwt.sign({name:data[0].Name},'secret', {expiresIn:'1h'})
                  res.json({

                     status:"success",
                     message:"Signin Successful",
                     data:data,
                     token
               

                  })
               }else{
                  res.json({
                     status:"Failed",
                     message:"Invalid login"
                  })
               }
            })

         }


      })



   }
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
