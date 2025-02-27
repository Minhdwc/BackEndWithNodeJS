const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const clientRouter = require("./Routes/client/index");
const adminRouter = require('./Routes/admin/index')
const mongodb = require("./config/db");

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

clientRouter(app);
adminRouter(app);

mongodb.connect();

const corOptions = {
  origin: ["http://localhost:3000"],
  credential: true,
};
app.use(cors(corOptions));
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
