const Joi = require('joi');
const accessoryService = require('../services/accessoryService');

const createAccessory = async(req, res)=>{
    try{
        const schema = Joi.object({
            name: Joi.string().required(),
            categoryAccessory: Joi.string().required(),
            price: Joi.number().required(),

        });
        const {error} = schema.validate(req.body);
        if(error){
            return res.status(400).json({
                error: error.status,
                message: error.details[0].message,
            });
        }
        const respon = await accessoryService.createAccessoryService(req.body);
        return res.status(200).json(respon);
    }catch(e){
        return res.status(404).json({message: e.message});
    }
}
const getAllAccessories = async(req, res)=>{
    try{
        const respon = await accessoryService.getAllAccessoriesService(req.body);
        return res.status(200).json(respon);
    }catch(e){
        return res.status(404).json({message: e.message});
    }
}
const deleteAccessory = async(req, res)=>{
    try{
        const id = req.params.id;
        if(!id){
            return res.status(404).json({status:"Error", message:"Accessory is required"});
        }
        const respon = await accessoryService.deleteAccessoryService(id);
        return res.status(200).json(respon);
    }catch(e){
        return res.status(404).json({message: e.message});
    }
}
const updateAccessory = async(req, res)=>{
    try{
        const id = req.params.id;
        if(!id){
            return res.status(404).json({status:"Error", message:"Accessory is required"});
        }
        const data = req.body;
        const respon = await accessoryService.updateAccessoryService(id, data);
        return res.status(200).json(respon);
    }
    catch(e){
        return res.status(404).json({message: e.message});
    }
}
module.exports = {
    createAccessory,
    getAllAccessories,
    deleteAccessory,
    updateAccessory
}