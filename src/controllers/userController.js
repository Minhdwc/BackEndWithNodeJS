const Joi = require('joi');
const userService = require('../services/userService');

const createUser = async (req, res)=>{
    try{
        const schema = Joi.object({
            name: Joi.string().required(),
            dateOfBirth: Joi.date().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
            comfirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
                'any.only': 'Confirm Password does not match',
              }),
            role: Joi.string(),
        });
        const {error} = schema.validate(req.body);
        if(error){
            return res.status(400).json({
                error: error.status,
                message: error.details[0].message,
            });
        }
        const respon = await userService.CreateUserService(req.body);
        return res.status(200).json(respon)
    }catch(e){
        return res.status(404).json({message: e.message});
    }
}
const getDetail = async(req, res)=>{
    try{
        const idUser = req.params.id;
        if(!idUser){
            return res.status(404).json({status:"error", message:"User is required"});
        }
        const respon = await userService.getDetailService(idUser);
        return res.status(200).json(respon);
    }catch(e){
        return res.status(404).json({message: e.message});
    }
}
const getAll = async(req, res)=>{
    try{
        const respon = await userService.getAll();
        return res.status(200).json(respon);
    }catch(e){
        return res.status(404).json({message: e.message});
    }
}
module.exports={    
    createUser,
    getDetail,
    getAll
}