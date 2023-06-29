require('dotenv').config();
const express = require('express');
let cors = require('cors');

const User = require('./routes/api/user');
const Product = require('./routes/api/product');

const app = express();

const connectDB = require('./db/conn');

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/user', User);
app.use('/api/product', Product);

app.listen(5000, ()=>{
    console.log("Serveur à l'écoute")
})
