const Joi = require("joi");
const foodService = require("../Services/food.service");
const imageService = require("../Services/image.service");

const create = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string.require(),
      description: Joi.string,
      price: Joi.number.require(),
      brand: Joi.string.require(),
      type: Joi.string.require(),
      stock: Joi.number.require()
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
    const accessoryData = { ...req.body, imageUrl };
    const response = await foodService.create(accessoryData);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(500).json({ message: "Id is required" });
    }
    const response = foodService.getOne(id);
    return res.status(500).json(response);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const getAll = async (req, res) => {
  try {
    const { limit, page, minPrice, maxPrice, minStock, maxStock } = req.query;
    const response = await foodService.getAll(
      10,
      page,
      minPrice,
      maxPrice,
      minStock,
      maxStock
    );
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const update = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(500).json({ message: "Id is required" });
    }
    const data = req.body;
    const response = foodService.update(id, data);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const deleteFood = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(500).json({ message: "Id is required" });
    }
    const response = await foodService.deleteAccessory(id);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
module.exports = {
  create,
  getAll,
  getOne,
  update,
  deleteFood,
};
