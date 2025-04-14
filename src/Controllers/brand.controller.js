const Joi = require("joi");
const brandService = require("../Services/brand.service");
const imageService = require("../Services/image.service");
require("mongoose");

const create = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      country: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    const file = req.file;
    if (!file) {
      return res.status(500).json({ message: "Image is required" });
    }
    const uploadedImage = await imageService.uploadFileToSupabase(file);
    const imageUrl = uploadedImage.url;

    const brandData = {
      ...req.body,
      imageUrl,
    };
    const response = await brandService.createBrand(brandData);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(500).json({ message: "Id is required" });
    }
    const response = await brandService.getOne(id);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const getAll = async (req, res) => {
  try {
    const { limit, page } = req.query;
    const response = await brandService.getAll(10, page);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const update = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(500).json({ message: "Invalid ID" });
    }
    const data = req.body;
    const response = await brandService.updateBrand(id, data);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const deleteBrand = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(500).json({ message: "Id is required" });
    }
    const response = await brandService.deleteBrand(id);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
module.exports = {
    create,
    getOne,
    getAll,
    update,
    deleteBrand
}