require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const employeeRoutes = require('./routes/employee')

//express app
const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })

//routes
app.use('/api/employee',employeeRoutes)

//connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    //listen for request
    app.listen(process.env.PORT, () => {
        console.log('connected to DB and listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })


