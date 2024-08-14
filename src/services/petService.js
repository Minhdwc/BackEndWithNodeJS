const pet = require("../models/pet");
const CreatePetService = (data) => {
    return new Promise(async (resolve, reject) => {
        const { name, species, genius, gender, size, color } = data;
        const createPet = await pet.create({
            name,
            species,
            genius,
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
   try{
    return new Promise(async (resolve, reject) => {
        const allPet = await pet.find({});
        resolve({
            status: "all pet",
            message: "This is all pet of shop",
            data: allPet
        })
    });
   }catch(e){
    reject(e);
   }

};

module.exports = {
    CreatePetService,
    getAllPetServices,
};
