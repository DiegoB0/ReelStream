const express = require('express');
const connectDB = require('./config/db');
const movieRoutes = require('./routes/movies');
const dotenv = require('dotenv');
const routes = require('./routes');
const cors = require('cors');

dotenv.config();

//Mongo
connectDB();

const app = express();

app.use(express.json());

app.use(cors());

//Routes
app.use('/api', routes);

module.exports = app;
