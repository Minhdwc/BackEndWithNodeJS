const express = require("express");
require("dotenv").config();
const bodyParser = require('body-parser');
const router = require('./Routes/index');
const mongodb = require('./config/db')
const multer = require('multer')


const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multer().single('file'))
router(app);

mongodb.connect();
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
