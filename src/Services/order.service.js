const order = require("../Models/order");
const createOrder = (data) => {
  try {
    new Promise(async (resolve, reject) => {
      const newPet = await pet.create(data);
      if (newPet) {
        resolve({
          status: "Created",
          data: newPet,
          message: "Created pet",
        });
      }
    });
  } catch (e) {
    reject(e);
  }
};
const getAll = () => {
  try {
    new Promise(async (resolve, reject) => {
      const allPet = await pet.find();
      if (allPet) {
        resolve({
          status: "Get all",
          data: allPet,
          message: "Get all pet",
        });
      }
    });
  } catch (e) {
    reject(e);
  }
};
const getOne = (id) => {
  try {
    new Promise(async (resolve, reject) => {
      const pet = await pet.findById(id);
      if (pet) {
        resolve({
          status: "Found pet",
          data: pet,
          message: "Found pet",
        });
      }
    });
  } catch (e) {
    reject(e);
  }
};
const updateOnePet = (id, data) => {
  try {
    new Promise(async (resolve, reject) => {
      if (id.length !== 24) {
        resolve({
          status: "Error",
          message: "Pet not found",
        });
        return;
      }
      const currentPet = await pet.findById({ _id: id });
      if (!currentPet) {
        resolve({
          status: "Error",
          message: "Pet not found",
        });
      }
      const updatePet = await pet.findByIdAndUpdate({ _id: id }, data, {
        new: true,
      });
      resolve({
        status: "Updated",
        data: updatePet,
        message: "Update successfully",
      });
    });
  } catch (e) {
    reject(e);
  }
};
const deleteOnePet = (id)=>{
    try{
        return new Promise(async(resolve, reject)=>{
            const findPet = await pet.findByIdAndDelete({_id: id});
            resolve({
                status: "Deleted",
                message:"Delete successfully",
            })
        })
    }catch(e){
        reject(e);
    }
}

module.exports={
    createOrder,
    deleteOnePet,
    getAll,
    getOne,
    updateOnePet
}