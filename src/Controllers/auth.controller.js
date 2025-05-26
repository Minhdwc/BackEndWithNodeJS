const authService = require('../Services/auth.service')
const joi = require('joi')

const register = async (req, res) => {
  try {
    const schema = joi.object({
      name: joi.string().required(),
      dateOfBirth: joi.date().required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
      role: joi.string().default("user"),
      image: joi.string().required(),
      addresses: joi.array().items(
        joi.object({
          display_name: joi.string().required(),
          lat: joi.number().required(),
          lon: joi.number().required(),
          address: joi.object().required(),
          isDefault: joi.boolean().default(false)
        })
      ).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const data = req.body;
    const response = await authService.register(data);
    return res.status(200).json(response);
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
    const respon = await authService.login(email, password);

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
    const response = await authService.profile(userId);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
    register,
    login,
    getProfile
}