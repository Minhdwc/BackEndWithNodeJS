const Joi = require('joi');
const petService = require('../services/petService');

const createPet = async (req, res)=>{
    try{
        const schema = Joi.object({
            name: Joi.string().required(),
            species: Joi.string().required(),
            genius: Joi.string().required(),
            gender: Joi.string().required(),
            size: Joi.object().required(),
            color: Joi.string().required(),
        });
        console.log(req.body);
        const{error} = schema.validate(req.body);
        if(error){
            return res.status(400).json({
                status: error.status,
                message: error.details[0].message,
            });
        }
        const respon = await petService.CreatePetService(req.body);
        return res.status(200).json(respon)
    }catch(e){
        return res.status(500).json({message: e.message});
    }
}
const  getAllPet = async (req, res) =>{
    try{
        const respon = await petService.getAllPetServices();
        return res.status(200).json(respon);
    }catch(e){
        return res.status(500).json({message: e.message});
    }
}
module.exports={
    createPet,
    getAllPet,
};