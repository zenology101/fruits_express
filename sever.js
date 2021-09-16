/////////////////////////////////////////////////
//order of the routes 
// I - Index
// N - New
// D - Destroy
// U - Update
// C - Create
// E - Edit
// S - Show
////////////////////////////////////////////////


//we import the express library 
const express = require('express');

//creating the application object 
const app = express();

//imports my fruits data 
const fruits = require("./models/fruits")

////////////////////////////////////////////
//Middle Ware
/////////////////////////////////
//Parse Request Bodies if Content-Type Header is: 
//application/x-www-form-urlencoded
app.use(express.urlencoded({extend: false})),

// serve files statically from the public folder
app.use(express.static("public"))

/////////////////////////////////////////////
//Routes 
/////////////////////////////////////////////
//Index route- gets all fruit 
app.get('/fruits/', (req,res) =>{
    res.render("index.ejs", {allFruits: fruits});
});

// NEW ROUTE - Renders form to Create Fruit
app.get("/fruits/new", (req, res) => {
    res.render("new.ejs")
  })

//Create route using Post request 
// Create Route - makes a new fruit
app.post("/fruits", (req, res) => {
    //process the readyToEat as true or false
    if(req.body.readyToEat === 'on'){
      req.body.readyToEat = true
    } else {
      req.body.readyToEat = false
    }
    // push req.body into the array of fruits
    fruits.push(req.body)
    //redirect (get) to /fruits
    res.redirect("/fruits")
  });

  //show route- gets one fruit (keep your show route at the end)
  //
app.get('/fruits/:indexOfArrayFruits', (req,res) =>{
    res.render("show.ejs", {fruit: fruits[req.params.indexOfArrayFruits]});
});


//the listener sever 
app.listen(3000, ()=>{
    console.log('listening')
});