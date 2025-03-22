const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const clientRouter = require("./Routes/client/index");
const adminRouter = require("./Routes/admin/index");
const mongodb = require("./config/db");

const app = express();
const corOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};
app.use(cors(corOptions));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongodb.connect();

clientRouter(app);
adminRouter(app);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
