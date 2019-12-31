// now we're gonna create a file just with the route (paths)

const express = require('express')
const fs = require("fs")
const data = require('./data.json')
//const form = require('./form') // requiring the function(req,res) {...}

// var for the routes
const routes = express.Router()


routes.get("/", function(req, res) {

    return res.render("index")
})

routes.get("/subscribe", function(req,res) {
    return res.render("form/subscribe")
})

routes.get("/update", function(req,res) {
    return res.render("form/update")
})

routes.get("/edit", function(req,res) {
    return res.render("form/user-form")
})

routes.get("/complete", function(req,res) {
    return res.render("form/form-complete")
})

routes.get("/notfound", function(req,res) {
    return res.render("form/notFound")
})

// POST REQUEST - when you submit your form
routes.post('/subscribe', function(req, res) {

   const keys = Object.keys(req.body)

   for (key of keys) {
       if (req.body[key] == "") {
           return res.send("Please, fill all fields. We need this information to complete the memory you've request")
       }
    }

    
       // destructuring req.body
       const {name, gender, alienStuff, destination, sexualOrientation, rolePlaying} = req.body
       // let because I'm gonna alter the id variable
       //data.recall.push(req.body) 
       
       const id = Number(data.recall.length + 1)
       const created_at = Date.now()

       data.recall.push({
        id,
        created_at,
        name, 
        gender, 
        alienStuff, 
        destination, 
        sexualOrientation, 
        rolePlaying
       })

       fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("ERROR")

       //return res.render("form/form-complete")
        return res.redirect('/complete')
       })
   

  })


module.exports = routes 