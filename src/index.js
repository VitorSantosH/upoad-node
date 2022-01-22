const express = require('express');
const routes = require('./routes/routes');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');


// instancia express
const app = express();
const port = 3333;


// database setup
mongoose.connect('mongodb://127.0.0.1:27017/upload', {
    useNewUrlParser: true
});


//Rotas 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('dev'));
app.use(routes);





app.listen(port, () => {
    console.log("servidor funcionando na porta: " + port)
})