const express = require("express");
const app=express();
const bodyParser=require("body-parser");
const axios=require("axios");
const https=require("https");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});
app.get("/success",function(req,res){
  res.sendFile(__dirname+"/success.html");
})
app.post("/success",function(req,res){
  const firstName=req.body.fname;
  const lastName=req.body.sname;
  const email=req.body.email;
  console.log(firstName,lastName,email);
  const data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields: {
          FNAME:firstName,
          LNAME:lastName

        }
      }
    ]
  };
  var jsonData=JSON.stringify(data);
  const url="https://us14.api.mailchimp.com/3.0/lists/0857a9d99e";
  const options={
    method:"POST",
    auth:"rohan07:000a93297b755c3002361179c3f10883-us14"
  }
  const request=https.request(url,options,function(response){
    if(response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
});
app.listen(3000,function(req,res){
  console.log("server 3000 has started");
});
