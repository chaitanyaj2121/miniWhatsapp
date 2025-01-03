// DATA BASE MADHE KAHI CHANGE KARAYCHA ASEL TR ASYNC AND AWAIT CHA USE KARAYCHA


const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Require ExpressError.js
const ExpressError=require("./ExpressError.js");

// method override
const methodOverride=require("method-override");
app.use(methodOverride("_method"));

// required to parse the data which come from the body of form
app.use(express.urlencoded({ extended: true }));

// required for ejs
const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//lets take the components of chat.js in index.js
const Chat = require("./models/chat.js");
const { log } = require("console");

main()
  .then(() => {
    console.log("Connection successful!");
  })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
}

app.listen(8080, () => {
  console.log("App is listening on the port 8080!");
});

app.get("/", (req, res) => {
  res.send("Root is Working!");
  console.log("Request Accepted!");
})

//Index Route
app.get("/chats",warpAsync( async (req, res,next) => {

    let chats = await Chat.find();
  console.log("Request accepted");

  // res.send("Working!");
  res.render("index.ejs", { chats });
  
}));


// New Route
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
})

// Create Route 
app.post("/chats",warpAsync( async(req, res,next) => {
  let { from, msg, to } = req.body;
  let newChat = new Chat({
      from: from,
      to: to,
      msg: msg,
      created_at: new Date(),
    })
    await newChat.save()
      
     res.redirect("/chats");
}));

//The higher verision of try and catch that is : warpAsync
function warpAsync(fn) {
  return function (req,res,next) {
       fn(req,res,next).catch((err)=>{next(err)});
  }
}

// Practice Handeling async errors
// ------------------------------imp--------------------------
// Edit route 
app.get("/chats/:id/edit",warpAsync( async(req,res,next)=>{
   
  let {id:postId}=req.params;
   let dtpost=await Chat.findOne({_id:postId});
   
   // in async functions it will not call next func auto 
   // we need to call the next function

   if(!dtpost){
    next(new ExpressError(404,"post/chat not found"));
   }
   else{
    res.render("edit.ejs",{dtpost});
   }
  //  console.log(dtpost);
   

  // res.send("working!");
}));

//In my own i have used the post method to update but the teacher has used put
// for that we required 
app.post("/chats/:id/edit",warpAsync( async(req,res)=>{
   let {msg:etmsg}=req.body;
  let {id}=req.params;
  
 await Chat.findByIdAndUpdate(id,{msg:etmsg});
  res.redirect("/chats");
}));

//DESTROY ROUTE
app.delete("/chats/:id",warpAsync( async(req,res)=>{
  let {id}=req.params;  
 await Chat.findByIdAndDelete(id);
 res.redirect("/chats"); 
}));

const handleValidationError= ()=>{
  console.log("This was the validation Error,Plese follow rules");
  console.log(err.message);
  return err;
  
}
app.use((err,req,res,next)=>{
console.log(err.name);
   if (err.name="ValidationError") {
    err=handleValidationError(err);
   }
    next(err);
});

//Error handler Middleware

app.use((err,req,res,next)=>{
  let {status=500,message="Something Went Wrong"}=err;
  res.status(status).send(message);
})