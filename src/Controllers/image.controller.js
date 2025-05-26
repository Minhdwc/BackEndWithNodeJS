const uploadService = require("../Services/image.service");

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        error: "Invalid file type",
      });
    }

    const maxSize = 10 * 1024 * 1024;
    if (req.file.size > maxSize) {
      return res.status(400).json({
        error: "File size invalid",
      });
    }

    const result = await uploadService.uploadFileToSupabase(req.file);

    res.status(200).json({
      message: "File uploaded successfully",
      data: result,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      error: "Error upload file",
      details: error.message,
    });
  }
};

module.exports = { uploadImage };
