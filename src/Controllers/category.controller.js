const Joi = require('joi');
const categoryServices = require('../Services/category.service');

const create = async(req, res)=>{
    try{
        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string(),
            typeOf: Joi.string().required()
        })
        const {error, values} = schema.validate(req.body)
        const data = req.body;
        if(error){
            return res.status(500).json({message: error.message})
        }
        const response = await categoryServices.createCategory(data);
        return res.status(200).json(response);
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const getOne = async(req, res)=>{
    try{
        const id = req.params.id;
        if(!id){
            return res.status(500).json({status: 500, message: "Id is required"})
        }
        const response = await categoryServices.getOne(id);
        return res.status(200).json(response);
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const getByType = async(req, res)=>{
    try{
        const type = req.params.type;
        if(!type){
            return res.status(500).json({status:500, message: "Type is required"})
        }
        const response = await categoryServices.getByType(type)
        return res.status(200).json(response)
    }catch(err){
        return res.status(500).json({ message: err.message})
    }
}

const getAll = async(req, res)=>{
    try{
        const response = await categoryServices.getAll();
        return res.status(200).json(response);
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const update = async(req, res)=>{
    try{
        const id = req.params.id;
        const data = req.body;
        if(!id){
            return res.status(500).json({status: 500, message: "Id is required"})
        }
        const response = await categoryServices.updateCategory(id, data);
        return res.status(200).json(response);
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const deleteCate = async(req, res)=>{
    try{
        const id = req.params.id;
        if(!id){
            return res.status(500).json({status: 500, message: "Id is required"})
        }
        const response = await categoryServices.deleteCategory(id);
        return res.status(200).json(response)
    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
}

module.exports = {
    create,
    getOne,
    getAll,
    update,
    deleteCate,
    getByType
}