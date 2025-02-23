const joi = require("joi");
const bcrypt = require("bcrypt");
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
const login = async (req, res) => {
  try {
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(500).json({
        status: error.status,
        message: error.details[0].message,
      });
    }

    const { email, password } = req.body;
    const respon = await userService.login(email, password);

    if (respon.status === "Error") {
      return res.status(500).json(respon);
    }

    return res.status(200).json(respon);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const getProfile = async (req, res) => {
  try {
    const userId = req.user;
    const response = await userService.profile(userId);
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
  deleteUser,
  login,
  getProfile,
};
