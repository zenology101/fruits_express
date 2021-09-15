//we import the express library 
const express = require('express');

//creating the application object 
const app = express();

//imports my fruits data 
const fruits = require("./models/fruits")

//routes
app.get('/fruits/', (req,res) =>{
    res.send(fruits);
});

app.get('/fruits/:indexOfArrayFruits', (req,res) =>{
    res.render("show.ejs", {fruit: fruits[req.params.indexOfArrayFruits]});
});

//the listener sever 
app.listen(3000, ()=>{
    console.log('listening')
});