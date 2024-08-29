const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dpqqqawyw",
  api_key: "638193582456984",
  api_secret: "2tgBvCo4C2GD-5gQVV_z2zjGa7U",
});

async function handleUploadImage(file) {
  try {
    const res = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return res;
  } catch (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }
}

async function handleDeleteImage(name) {
  try {
    const response = await cloudinary.uploader.destroy(name, {
      resource_type: "image"
    });
    console.log(response);
    return response;
  } catch (error) {
    throw new Error(`Delete failed: ${error.message}`);
  }
}

module.exports = {
  handleUploadImage,
  handleDeleteImage
};
