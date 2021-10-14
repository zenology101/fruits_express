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

//import method override

const methodOverride = require('method-override')

////////////////////////////////////////////
//Middle Ware
/////////////////////////////////
//Parse Request Bodies if Content-Type Header is: 
//application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false})),

// serve files statically from the public folder
app.use(express.static("public"))

//register the method-override middleware 
app.use(methodOverride('_method'))


/////////////////////////////////////////////
//Routes 
/////////////////////////////////////////////
//Index route- gets all fruit 
app.get('/fruits/', (req,res) =>{
    res.render("index.ejs", {allFruits: fruits, title: "Fruits - Index Page"});
});

// NEW ROUTE - Renders form to Create Fruit
app.get("/fruits/new", (req, res) => {
    res.render("new.ejs", {title: "Fruits - New Page"})
  })

//Create route using Post request 
//Create Route - makes a new fruit
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

  //delete/destroy route will destroy a fruit 
  app.delete("/fruits/:indexOfArrayFruits", (req,res) => {
    fruits.splice(req.params.indexOfArrayFruits,1)
    res.redirect("/fruits")
  })

  // Edit route will give a form to edit a particular todo
  app.get("/fruits/:indexOfArrayFruits/edit", (req,res) =>{
    res.render("edit.ejs", {
      fruit: fruits[req.params.indexOfArrayFruits],
      index: req.params.indexOfArrayFruits,
      title: "Fruits App - Edit Page"
    })
  })

  //update route- receives form data from edit and updates first 
  app.put("/fruits/:indexOfArrayFruits", (req,res) => {
    //process the readyToEat as true or false
    if(req.body.readyToEat === 'on'){
      req.body.readyToEat = true
    } else {
      req.body.readyToEat = false
    }
    //Update the fruit
    fruits[req.params.indexOfArrayFruits] = req.body
    //Redirect them back to index 
    res.redirect("/fruits")
  })

  //show route- gets one fruit (keep your show route at the end)
  //
app.get('/fruits/:indexOfArrayFruits', (req,res) =>{
  //render has 2 things, the file that you want to grab data from and an object 
    res.render("show.ejs", {fruit: fruits[req.params.indexOfArrayFruits], title: "Fruits - Show Page"});
});


//the listener sever 
app.listen(3000, ()=>{
    console.log('listening')
});