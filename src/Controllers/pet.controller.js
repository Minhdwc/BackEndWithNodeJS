const Joi = require('joi');
const petServices = require('../Services/pet.service');

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
        });

        const { error, data } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: error.status,
                message: error.message
            });
        }     
        const petData = req.body;        
        const response = await petServices.createPet(petData);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = {
    create
};
