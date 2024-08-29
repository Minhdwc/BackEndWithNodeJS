const Multer = require("multer");
const fileType = require("file-type");

const storage = Multer.memoryStorage();
const upload = Multer({
    storage,
});

const checkImage = async (req, res, next) => {
    if (!req.file) {
        return res.status(404).json("No file uploaded");
    }
    try {
        const fileInfo = await fileType.fromBuffer(req.file.buffer);
        const mimeType = fileInfo ? fileInfo.mime : '';
        if (!mimeType.startsWith('image/')) {
            return res.status(400).send('File is not an image.');
        }
        next();
    } catch (e) {
        return res.status(404).json({ message: e.message });
    }
}

module.exports = {
    upload,
    checkImage
};
