const Joi = require("joi");
const petServices = require("../Services/pet.service");

const create = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      species: Joi.string().required(),
      generic: Joi.string().required(),
      gender: Joi.string().required(),
      category: Joi.string().required(),
      size: Joi.object(),
      color: Joi.string().required(),
      image: Joi.string().required(),
    });

    const { error, data } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: error.status,
        message: error.message,
      });
    }
    const petData = req.body;
    const response = await petServices.createPet(petData);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ status: 400, message: "Id is required" });
    }
    const response = await petServices.getOne(id);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message });
  }
};
const getAll = async (req, res) => {
  try {
    const response = await petServices.getAll();
    return res.status(200).json(response);
  } catch (err) {
    return res.status(400).json({ status: err.status, message: err.message });
  }
};
const update = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ status: 400, message: "Id is required" });
    }
    const data = req.body;
    const response = await petServices.updateOnePet(id, data);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(400).json({ status: err.status, message: err.message });
  }
};

const deletePet = async(req, res) => {
  try{
    const id = req.params.id
    if(!id){
      return res.status(400).json({status: 400, message: "Id is required"})
    }
    const response = await petServices.deleteOnePet(id);
    return res.status(200).json(response)
  }catch(err){
    return res.status(400).json({ status: 400, message: err.message})
  }
}

module.exports = {
  create,
  getOne,
  getAll,
  update,
  deletePet
};
