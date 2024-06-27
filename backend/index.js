const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const auth = require('./middlewares/auth');
const { login } = require('./controllers/login');
const Task_collection = require('./models/tasks.model');
const { deserialize } = require('v8');

app.use(express.json({ limit: "50mb" }))
app.use(cors());
app.use(express.urlencoded({ extended: false, limit: "50mb" }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const atlasURI = 'mongodb+srv://Ishaan:pa7FBiyixZUBqKRb@cluster0.zfxdjvt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
 
mongoose.connect(atlasURI).then(() => {
    console.log('connected to db');
}).catch(err => {
    
});

app.post('/login',login);
app.post('/validate',auth,(req,res)=>{
    res.status(200).json({valid:true});
})
app.post('/tasks',auth,(req,res)=>{
    Task_collection.find({email:req.userFromToken.email}).then((data)=>{
        res.json(data);
    })
})

app.post('/taskadd',auth,(req,res)=>{
    Task_collection.insertMany([{email:req.userFromToken.email,description:req.body.description,title:req.body.title}]).then((data)=>{
        res.status(200).json({id:data[0]._id});
    })
})
app.post('/taskupdate',auth,(req,res)=>{
    Task_collection.findOneAndUpdate({email:req.userFromToken.email,_id:req.body.id},{$set:{title:req.body.title,description:req.body.description}},{ new: true }).then((data)=>{
        res.status(200).json({id:data._id});
    })
})
app.post('/taskget',auth,(req,res)=>{
    Task_collection.findOne({email:req.userFromToken.email,_id:req.body.id}).then((data)=>{
        res.status(200).json(data);
    })
})

app.post('/taskdel',auth,(req,res)=>{
    Task_collection.findOneAndDelete({email:req.userFromToken.email,_id:req.body.id}).then((data)=>{
        res.status(200);
    })
})


app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const server = app.listen(5000);
module.exports = {
    server
}