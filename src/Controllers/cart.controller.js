const Joi = require('joi');
const cartService = require('../Services/cart.service')
const authen = require('../middleware/authMiddleware')


const create = async(req, res)=>{
    try{
        const schema = Joi.object({
            item: Joi.array().items(
                Joi.object({
                    idPet: Joi.string().allow(null),
                    idProduct: Joi.string().allow(null),
                    quantity: Joi.number(),
                    price: Joi.number(),
                    totalPrice: Joi.number().allow(null),
                    image: Joi.string().allow(null),
                })
            ).required(),
            userId: Joi.string().required(),
        })
        const {error, values} = schema.validate(req.body)
        if(error){
            return res.status(500).json({message: error.message})
        }
        const data = req.body
        const response = await cartService.create(data)
        return res.status(200).json(response)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const getCartOfUser = async(req, res)=>{
    try{
        const idUser = req.params.id
        if(!id){
            return res.status(500).json({message: "Id is required" });
        }
        const response = await cartService.getByUser(idUser)
        return res.status(200).json(response)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const update = async(req, res)=>{
    try{
        const {id, cartUpdate} = req.body
        if(!id){
            return res.status(500).json({ status: 500, message: "Id is required" });
        }
        const response = await cartService.update(id, cartUpdate)
        return res.status(200).json(response)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const deleteCart = async(req, res)=>{
    try{
        const userId = req.params.id
        const response = await cartService.clearCart(userId)
        return res.status(200).json(response)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

module.exports = {
    create,
    getCartOfUser,
    update,
    deleteCart
}