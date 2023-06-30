const express=require('express');
const app=express();
const fs=require('fs');
const port=80;
const path=require('path');
const mongoose=require("mongoose")
const bodyparser=require("body-parser")
app.use('/static',express.static('static'));
app.use(express.urlencoded());
mongoose.connect('mongodb://127.0.0.1:27017/contactDance',{useNewUrlParser:true})

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res)=>{
    const t={};
res.status(200).render('home.pug',t);
})
app.get('/contact',(req,res)=>{
    const t={};
res.status(200).render('contact.pug',t);
});
//back
var contactSchema=new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    address:String
 
});
var Contact=mongoose.model("Contact",contactSchema);
app.post('/contact',(req,res)=>{
    var contactData=new Contact(req.body);
    contactData.save()
    .then(() => {
        res.send('Value saved successfully!');
      })
      .catch((error) => {
      res.send('Error saving value:', error);
      });
      res.status(200).render('contact.pug');
    
});


app.listen(port,()=>{
   console.log("server is started\n");
})
 

