const express=require('express');
const app=express();
const fs=require('fs');
const path=require('path')
const userModel=require('./models/user');

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// app.get("/home",(req,res)=>{
//     res.render("main");
// })

app.get("/",function(req,res){
    res.render("index");
})

app.get("/add",(req,res)=>{
    res.render("add");
})

app.post('/create',(req,res)=>{
    userModel.create({
        shopname:req.body.shopname,
        age:req.body.age,
        name:req.body.name,
        address:req.body.address
    }).then(function(newuser){
        res.redirect('/users');
    });
});

app.get('/users',(req,res)=>{
    userModel.find().then(function(users){
        res.render('users',{users:users});
    })
});

// for deletion of any costumer

app.get('/delete/:id',(req,res)=>{
// res.send(req.params.id)
    userModel.findOneAndDelete({_id:req.params.id})
    .then(function(deleteduser){
        res.redirect("/users");
    })
})

// For read more option 

app.get('/readmore/:id',(req,res)=>{
    userModel.findOne({_id:req.params.id})
    .then(function(user){
        res.render('readmore',{user});
    })
})

// for update the data of customer



app.get('/update/:id',(req,res)=>{
    // res.send(req.params.id)
    userModel.findOne({_id:req.params.id}).then(function(user){
        res.render("update",{user});
    })
})
app.post('/update/:id',(req,res)=>{
    userModel.findOneAndUpdate({_id:req.params.id},{name:req.body.name,shopname:req.body.shopname,address:req.body.address,age:req.body.age},{new:true})
    .then(function(updated){
        res.redirect("/users");
    })

})


app.listen(3000,function(){
    console.log("running");
})
