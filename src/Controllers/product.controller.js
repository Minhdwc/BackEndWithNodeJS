const Joi = require('joi')
const product = require('../Services/product.service')

const create = async(req, res)=>{
    try{
        const schema = Joi.object({
            name: Joi.string().required(),
            price: Joi.number().required(),
            stock: Joi.number().required(),
            description: Joi.string(),
            cateId: Joi.string().required(),
            categoryId: Joi.string().required(),
        })
        const {error, data} = schema.validate(req.body);
        if(error){
            return res.status(500).json({message: error.message})
        }
        const response = await product.create(data)
        return res.status(200).json(response)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}
const getOne = async(req, res)=>{
    try{
        const id = req.params.id;
        if(!id){
            return res.status(500).json({message:'Invalid id'})
        }
        const response = await product.getOne(id)
        return res.status(200).json(response)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}
const getAll = async(req, res) =>{
    try{
        const {limit, page, search, sortDir, cateId,  priceFrom, priceTo} = req.query
        const response = await product.getAll(limit, page, search, sortDir, cateId, parseInt(priceFrom), parseInt(priceTo))
        return res.status(200).json(response)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}
const update = async(req, res)=>{
    try{
        const id = req.params.id;
        if(!id){
            return res.status(500).json({message: 'Invalid id'})
        }
        const data = req.body
        const response = product.update(id, data)
        return res.status(200).json({message: response})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}
const deletePro = async(req, res)=>{
    try{
        const id = req.params.id;
        if(!id){
            return res.status(500).json({message: 'Invalid id'})
        }
        const response = product.deleteProduct(id)
        return res.status(200).json(response)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

module.exports ={
    create,
    getAll,
    getOne,
    update,
    deletePro
}