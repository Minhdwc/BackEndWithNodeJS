const accessory = require("../models/accessory");
const createAccessoryService = (data) => {
    return new Promise(async (resolve, reject) => {
        const { name, categoryAccessory, price } = data;
        const createAccessory = await accessory.create({
            name,
            categoryAccessory,
            price,
        });
        if (createAccessory) {
            resolve({
                status: "success",
                message: "Accessory created successfully",
                data: createAccessory,
            });
        }
    });
};
const getAllAccessoriesService = () => {
    try {
        return new Promise(async (resolve, reject) => {
            const allAccessories = await accessory.find({});
            resolve({
                status: "get All Accessories",
                message: "All accessories",
                data: allAccessories,
            });
        });
    } catch (e) {
        reject(e);
    }
};
const deleteAccessoryService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (id.length !== 24) {
                resolve({ status: "Error", message: "Invalid id" });
                return;
            }
            await accessory.findByIdAndDelete({ _id: id });
            resolve({
                status: "Deleted",
                message: "Accessory deleted",
            })
        } catch (e) {
            reject(e);
        }
    });
};
const updateAccessoryService = (id, data)=>{
    return new Promise(async (resolve, reject) => {
            try{
                if (id.length !== 24) {
                    resolve({ status: "Error", message: "Invalid id" });
                    return;
                }
                const checkAccessory = await accessory.findOne({_id: id});
                if(!checkAccessory){
                    resolve({status: "Error", message: "Accessory not found"});
                }
                const updateAccessory = await accessory.findByIdAndUpdate(id, data, {
                    new: true,
                });
                resolve({status:"Updated", message: "Accessory updated", data: updateAccessory})
            }catch (e) {
                reject(e);
            }
    });
};
module.exports={
    createAccessoryService,
    getAllAccessoriesService,
    deleteAccessoryService,
    updateAccessoryService
}