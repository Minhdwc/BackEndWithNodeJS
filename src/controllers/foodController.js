const Joi = require('joi');
const foodService = require('../services/foodService');

const createFood =async (req, res)=>{
    try{
        const schema = Joi.object({
            name: Joi.string().required(),
            categoryPet: Joi.string().required(),
            Price: Joi.number().required(),
        });
        const {error} = schema.validate(req.body);
        if(error){
            return res.status(400).json({
                error: error.status,
                message: error.details[0].message,
            });
        }
        const respon = await foodService.CreateFoodServices(req.body);
        return res.status(200).json(respon);
    }
    catch(e){
        return res.status(400).json({message: e.message});
    }
}
const getAllFood = async(req, res)=>{
    try{
        const respon = await foodService.getAllFoodServices();
        return res.status(200).json(respon);
    }catch(e){
        return res.status(400).json({message: e.message});
    }
}
const deleteFood = async(req, res)=>{
    try{
        const checkFood = req.params.id;
        if(!checkFood){
            return res.status(404).json({status:"Error", message:"Food is required"});
        }
        const respon = await foodService.DeleteFoodServices(checkFood);
        return res.status(200).json(respon);
    }
    catch(e){
        return res.status(400).json({message: e.message});
    }
}
const updateFood = async(req, res)=>{
    try{
        const checkFood = req.params.id;
        const data = req.body
        if(!checkFood){
            return res.status(404).jjson({status:"Error", message:"Food is required"});
        }
        const respon = await foodService.UpdateFoodServices(checkFood, data);
    }catch(e){
        return res.status(400).json({message: e.message});
    }
}
module.exports={
    createFood,
    getAllFood,
    deleteFood,
    updateFood,
}