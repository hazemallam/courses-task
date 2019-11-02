const express = require('express');
const hbs = require('hbs');
const path = require('path');
const myRouter = require('../routers/routes')

    

//Define App
const app = express()

//Define main folders paths
const publicDirectory = path.join(__dirname,'../public')
const viewsDirectory = path.join(__dirname,'../templates/views')
const partialDirectory = path.join(__dirname,'../templates/partials')

//setup handelbars engine and views locations
app.set('view engine','hbs')
app.set('views',viewsDirectory)
hbs.registerPartials(partialDirectory)

//set static files
app.use(express.static(publicDirectory))

// Routes

app.use(myRouter)

//run server on localhost:5000
app.listen(5001, function(){
    console.log(`server run on port 5001`)
})