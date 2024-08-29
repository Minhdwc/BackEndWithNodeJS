const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require('body-parser');
const router = require("./routes/index");

const port = 5000;
mongoose
    .connect(
        `mongodb+srv://leminhduc5732:Minhduc1410@clusterminhduc.zo7hk3n.mongodb.net/?retryWrites=true&w=majority&appName=ClusterMinhDuc`,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("Connected!!!"))
    .catch((err) => console.error(err));    
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
router(app);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});