const Joi = require('joi')
const OrderService = require('../Services/order.service')

const create =async(req, res)=>{
    try{
        const schema = Joi.object({
            total: Joi.number().required(),
            quantity: Joi.number().required(),
            delivery_location: Joi.object({
                city: Joi.string().required(),
                district: Joi.string().required(),
                street: Joi.string().required(),
                number_house: Joi.string().required(),
            }).required(),
            type_pay: Joi.string().required(),
            status: Joi.string().required(),
            item: Joi.array({
                itemId: Joi.string().required(),
                quantity: Joi.number().required(),
                price: Joi.number().required(),
            })
        })
        const {error, values} = schema.validate(req.body)
        if(error){
            return res.status(500).json({message: error.message})
        }
        const data = req.body
        const response = await OrderService.createOrder(data)
        return res.status(200).json(response)
    }catch(e){
        return res.status(500).json({message: e.message})
    }
}
const getOne = async(req, res)=>{
    try{
        const id = req.params.id;
        if (!id) {
            return res.status(500).json({ message: "Id is required" });
          }
          const response = await OrderService.getOne(id)
          return res.status(200).json(response)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}
const getAll = async(req, res)=>{
    try{
        const response = await OrderService.getAll()
        return res.status(200).json(response)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}
const update = async(req, res)=>{
    try{
        const id = req.params.id;
        if (!id) {
            return res.status(500).json({ message: "Id is required" });
          }
          const data = req.body
        const updateOrder = await OrderService.update(id, data)
        return res.status(200).json(updateOrder)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}
const deleteOrder = async(req, res)=>{
    try{
        const id = req.params.id;
        if(!id){
            return res.status(500).json({message: "Invalid id"})
        }
        const response = await OrderService.deleteOrder(id)
        return res.status(500).json(response)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

module.exports = {
    create,
    getOne,
    getAll,
    update,
    deleteOrder
}