const express = require('express');
const router = express.Router();
const { upload, checkImage } = require('../middlewares/multer');
const supportController = require("../controllers/supportController");

router.get('/', (req, res) =>{
     res.status(200).json("Home Router");
})
router.delete('/image/:name', supportController.deleteImage);
router.post("/upload", upload.single("my_file"), checkImage, supportController.uploadImage);


module.exports = router;