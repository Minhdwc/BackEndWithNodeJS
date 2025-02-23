const Joi = require('joi')
const reviewService = require('../Services/review.service')

const create = async(req, res)=>{
    try{
        const schema = Joi.object({
            userId: Joi.string().required(),
            itemId: Joi.string().required(),
            comment: Joi.string().required(),
        })
        const {error, values} = schema.validate(req.body)
        if(error){
            return res.status(500).json({message: error.message})
        }
        const data = request.body
        const response = await reviewService.create(data)
        return res.status(200).json(response)
    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
}
const getOne = async(req, res)=>{
    try{
        const id = req.params.id;
        if(!id){
            return res.status(500).json({message: 'Invalid id'})
        }
        const response = await reviewService.getOne(id)
        return res.status(200).json(response)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}
const getAll = async(req, res)=>{
    try{
        const response = await reviewService.getAll()
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
        const data = req.body;
        const response = await reviewService.updateAppointment(id, data)
        return res.status(200).json(response)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}
const deleteReview = async(req, res)=>{
    try{
        const id = req.params.id;
        if(!id){
            return res.status(500).json({message: 'Invalid id'})
        }
        const response = await reviewService.deleteApointment(id)
        return res.status(200).json(response)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

module.exports = {
    create,
    deleteReview,
    getAll,
    getOne,
    update
}