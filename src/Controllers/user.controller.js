const joi = require("joi");
const userService = require("../Services/user.service");

const create = async (req, res) => {
  try {
    const schema = joi.object({
      name: joi.string().required(),
      dateOfBirth: joi.date().required(),
      email: joi.string().required(),
      password: joi.string().required(),
      role: joi.string().required(),
      image: joi.string(),
      addresses: joi.array().items(
        joi.object({
          display_name: joi.string().required(),
          lat: joi.number().required(),
          lon: joi.number().required(),
          address: joi.object().required(),
          isDefault: joi.boolean()
        })
      )
    });
    const { error, values } = schema.validate(req.body);
    const data = req.body;
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    const response = await userService.createUser(data);
    return res.status(200).json({ response });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(500).json({ message: "Invalid id" });
    }
    const response = await userService.getUser(id);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    const response = await userService.getAll();
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(500).json({ message: "Invalid id" });
    }
    const schema = joi.object({
      name: joi.string(),
      dateOfBirth: joi.date(),
      email: joi.string(),
      password: joi.string(),
      role: joi.string(),
      image: joi.string(),
      addresses: joi.array().items(
        joi.object({
          display_name: joi.string().required(),
          lat: joi.number().required(),
          lon: joi.number().required(),
          address: joi.object().required(),
          isDefault: joi.boolean()
        })
      )
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const data = req.body;
    const response = await userService.updateUser(id, data);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(500).json({ message: "Invalid id" });
    }
    const response = await userService.deleteUser(id);
    return res.status(200).json({ response });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
module.exports = {
  create,
  getAll,
  getOne,
  update,
  deleteUser,
};
