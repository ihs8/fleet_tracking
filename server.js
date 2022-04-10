const express = require('express');
const mongoose = require('mongoose');

const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require("./models/user");

const bodyParser= require("body-parser");

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// This responds a POST request for the homepage
app.post('/login', function (req, res) {
   let email = req.body.email;
   let password = req.body.password;

   email=email.trim();
   password=password.trim();

   if(email=="" || password=="") {
      res.json({
         status:"Failed",
         message:"Empty login"


      })
   }else {
      
      user.find({email:email}).then(data => {
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
                     message:"Invalid login",
                     err:err,
                     data:data[0].Name
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
