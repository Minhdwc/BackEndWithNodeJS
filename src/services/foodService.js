const food = require("../models/food");
const CreateFoodServices = (data) => {
  return new Promise(async (resolve, reject) => {
    const { name, categoryPet, Price } = data;
    const createFood = await food.create({
      name,
      categoryPet,
      Price,
    });
    if (createFood) {
      resolve({
        status: "created",
        message: "Food created successfully",
        data: createFood,
      });
    }
  });
};
const getAllFoodServices = () => {
  try {
    return new Promise(async (resolve, reject) => {
      const allFood = await food.find({});
      resolve({
        status: "Found all",
        message: "Food is found successfully",
        data: allFood,
      });
    });
  } catch (e) {
    reject(e);
  }
};
const DeleteFoodServices = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
        if(id.length !== 24){
            resolve({status:"error", message:"Invalid id"});
            return;
        }
        await food.findByIdAndDelete({ _id: id });
        resolve({
            status: "deleted",
            message: "Food deleted successfully",
        });
    } catch (e) {
      reject(e);
    }
  });
};
const UpdateFoodServices = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try{
        if(id.length !== 24){
            resolve({status: "error", message:"Invalid id"});
            return;
        }
        const checkFood = await food.findOne({_id: id});
        if(!checkFood){
            resolve({status: " not found", message:"Food not found"})
        }
        const updateFood = await food.findByIdAndUpdate(id, data, {
            new: true
        });
        resolve({
            status: "OK",
            message:"Updated successfully",
            data: updateFood
        }); 
    }catch(e){
        reject(e);
    };
  });
};
module.exports ={
    CreateFoodServices,
    getAllFoodServices,
    DeleteFoodServices,
    UpdateFoodServices,
}