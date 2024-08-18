const Joi = require('joi');
const accessoryService = require('../services/accessoryService');

const createAccessory = async(req, res)=>{
    try{
        const schema = Joi.object({
            name: Joi.string().required(),
        })
    }catch(e){
        return res.status(404).json({message: e.message});
    }
}