const supportService = require('../services/supportService');

const deleteImage = async (req, res) => {
    try {
        const name = req.params.name;
        if (!name) {
            return res.status(400).json({ message: 'Image name is required' });
        }
        const response = await supportService.handleDeleteImage(name);
        return res.status(200).json(response);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: e.message });
    }
};

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const dataURI = `data:${req.file.mimetype};base64,${b64}`;
        const response = await supportService.handleUploadImage(dataURI);
        return res.status(200).json(response);
    } catch (e) {
        console.error(e); // Ghi log lỗi để dễ dàng theo dõi
        return res.status(500).json({ message: e.message });
    }
};

module.exports = {
    deleteImage,
    uploadImage
};
