const uploadService = require('../Services/image.service');

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(500).json({ error: 'No file uploaded' });
    }

    const { file } = req;
    const result = await uploadService.uploadFileToSupabase(file);
    
    res.status(200).json({
      message: 'File uploaded successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({error: error.message });
  }
};

module.exports = { uploadImage };
