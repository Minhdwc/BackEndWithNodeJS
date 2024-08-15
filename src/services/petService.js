const pet = require("../models/pet");
const CreatePetServices = (data) => {
  return new Promise(async (resolve, reject) => {
    const { name, species, generic, gender, size, color } = data;
    const createPet = await pet.create({
      name,
      species,
      generic,
      gender,
      size,
      color,
    });
    if (createPet) {
      resolve({
        status: "created",
        message: "pet created successfully",
        data: createPet,
      });
    }
  });
};
const getAllPetServices = () => {
  try {
    return new Promise(async (resolve, reject) => {
      const allPet = await pet.find({});
      resolve({
        status: "all pet",
        message: "This is all pet of shop",
        data: allPet,
      });
    });
  } catch (e) {
    reject(e);
  }
};
const deletePetServices = (id) => {
  try {
    return new Promise(async (resolve, reject) => {
      await pet.findByIdAndDelete({_id: id});
      resolve({
        status: "deleted",
        message: "pet deleted successfully",
      });
    });
  } catch (e) {
    reject(e);
  }
};
const updatePetServices = (id, data) => {
    try{
        return new Promise(async(resolve, reject)=>{
            if(id.length !== 24){
                resolve({status: "error", message:"Id is invalid"});
                return;
            }
            const checkPet = await pet.findOne({_id: id});
            if(!checkPet)
            {
                resolve({status:"not found", message: "pet not found"})
            }
            const updatePet = await pet.findByIdAndUpdate(id, data, {
                new: true,
            });
            resolve({
                status: "OK",
                message:"Updated successfully",
                data: updatePet
            });            
        });
    }catch(e){
        reject(e);
    }
}
module.exports = {
  CreatePetServices,
  getAllPetServices,
  deletePetServices,
  updatePetServices,
};
