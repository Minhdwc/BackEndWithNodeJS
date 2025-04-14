const Joi = require("joi");
const accessoryService = require("../Services/accessory.service");
const imageService = require("../Services/image.service");

const create = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string.require(),
      description: Joi.string,
      price: Joi.number.require(),
      stock: Joi.number,
      image_url: Joi.string(),
    });
    const { error } = schema.validate(req.body)
    if(error){
        return res.status(500).json({ message: error.message})
    }
    const file = req.file;
    if(!file){
        return res.status(500).json({message: "Image is required"})
    }
    const uploadedImage = await imageService.uploadFileToSupabase(file)
    const imageUrl = uploadedImage.url
    const accessoryData = {...req.body, imageUrl}
    const response = await accessoryService.create(accessoryData)
    return res.status(200).json(response)
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
const getOne = async(req, res)=>{
    try{
        const id = req.params.id;
        if(!id){
            return res.status(500).json({message: "Id is required"})
        }
        const response = accessoryService.getOne(id);
        return res.status(500).json(response)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}
const getAll = async(req, res)=>{
    try{
        const { limit, page, minPrice, maxPrice, minStock, maxStock } = req.query
        const response = await accessoryService.getAll(10, page, minPrice, maxPrice, minStock, maxStock)
        return res.status(200).json(response)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}
const update = async(req, res)=>{
    try{
        const id = req.params.id;
        if(!id){
            return res.status(500).json({message: "Id is required"})
        }
        const data = req.body
        const response = accessoryService.update(id, data)
        return res.status(200).json(response)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}
const deleteAccesory = async(req, res)=>{
    try {
        const id = req.params.id;
        if (!id) {
          return res.status(500).json({ message: "Id is required" });
        }
        const response = await accessoryService.deleteAccessory(id);
        return res.status(200).json(response);
      } catch (err) {
        return res.status(500).json({ message: err.message });
      }
}
module.exports={
    create,
    getAll,
    getOne,
    update,
    deleteAccesory
}