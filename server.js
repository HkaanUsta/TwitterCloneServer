const express = require("express");
const app = express();
const server = require("http").Server(app);
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require('body-parser')

// .env config
require('dotenv').config();

//Cors Config
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use("/public",express.static("./public"))

const connect_url = process.env.MONGO_DB;
mongoose.connect(connect_url,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
mongoose.connection.once('open', ()=>{
    console.log('Database connection successfully...');
})

//Router Config
const router = require("./Routers/router");
app.use(router)

server.listen(5000);


