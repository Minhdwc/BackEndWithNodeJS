const Joi = require('joi');
const petService = require('../services/petService');

const createPet = async (req, res)=>{
    try{
        const schema = Joi.object({
            name: Joi.string().required(),
            species: Joi.string().required(),
            generic: Joi.string().required(),
            gender: Joi.string().required(),
            category: Joi.string().required(),
            size: Joi.object().required(),
            color: Joi.string().required(),
            image: Joi.string().required(),
        });
        const{error} = schema.validate(req.body);
        if(error){
            return res.status(400).json({
                status: error.status,
                message: error.details[0].message,
            });
        }
        const respon = await petService.CreatePetServices(req.body);
        return res.status(200).json(respon)
    }catch(e){
        return res.status(500).json({message: e.message});
    }
}
const getAllPet = async (req, res) =>{
    try{
        const respon = await petService.getAllPetServices();
        return res.status(200).json(respon);
    }catch(e){
        return res.status(500).json({message: e.message});
    }
}
const deletePet = async (req, res)=>{
    try{
        const petId = req.params.id
        if(!petId){
            return res.status(404).json({status:"Error", message:"Pet is required"});
        }
        const respon = await petService.deletePetServices(petId);
        return res.status(200).json(respon);
    }catch(e){
        return res.status(500).json({message: e.message});
    }
}
const updatePet = async (req, res)=>{
    try{
        const petId = req.params.id;
        const data = req.body;
        if(!petId){
            return res.status(404).json({status: "Error", message:"Pet is required"});
        }
        const respon = await petService.updatePetServices(petId, data);
        return res.status(200).json(respon);
    }catch(e){
        return res.status(500).json({message: e.message});
    }
}
module.exports={
    createPet,
    getAllPet,
    deletePet,
    updatePet,
};