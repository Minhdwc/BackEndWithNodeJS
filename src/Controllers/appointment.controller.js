const Joi = require('joi')
const appointmentService = require('../Services/appointment.service')

const create = async (req, res)=>{
    try{
        const schema = Joi.object({
            userId: Joi.string().required(),
            petId: Joi.string().required(),
            service: Joi.string().required(),
            status: Joi.string().required(),
        })
        const {error, values} = schema.validate(req.body)
        const data = req.body
        if(error){
            return res.status(500).json({message: error.message})
        }
        const response = await appointmentService.createAppointment(data)
        return res.status(200).json(response)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const getOne = async(req, res)=>{
    try{
        const id = req.params.id;
        if(!id){
            return res.status(500).json({message: 'Invalid id'})
        }
        const response = await appointmentService.getOne(id)
        return res.status(200).json(response)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}
const getAll = async(req, res)=>{
    try{
        const {limit, page, service, status} = req.query
        const response = await appointmentService.getAll(limit, page, service, status)
        return res.status(200).json(response)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}
const getByIdUser = async(req, res)=>{
    try{
        const id = req.params.id;
        if(!id){
            return res.status(500).json({message: 'Invalid id'})
        }
        const response = await appointmentService.getByIdUser(id)
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
        const response = await appointmentService.updateAppointment(id, data)
        return res.status(200).json(response)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}
const deleteAppointment = async(req, res)=>{
    try{
        const id = req.params.id;
        if(!id){
            return res.status(500).json({message: 'Invalid id'})
        }
        const response = await appointmentService.deleteApointment(id)
        return res.status(200).json(response)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

module.exports ={
    create,
    getAll,
    getOne,
    getByIdUser,
    update,
    deleteAppointment
}