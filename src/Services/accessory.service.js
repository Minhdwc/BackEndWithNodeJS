const accessory = require("../Models/accessory");

const create = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newAccessory = await accessory.create(data);
      if (newAccessory) {
        resolve({
          status: "Created",
          data: newAccessory,
          message: "Created accessory",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const getAll = (limit, page, minPrice, maxPrice, minStock, maxStock) => {
  return new Promise(async (resolve, reject) => {
    try {
      let filter = {};

      if (minPrice !== undefined || maxPrice !== undefined) {
        filter.price = {};
        if (minPrice !== undefined) filter.price.$gte = Number(minPrice);
        if (maxPrice !== undefined) filter.price.$lte = Number(maxPrice);
      }

      if (minStock !== undefined || maxStock !== undefined) {
        filter.stock = {};
        if (minStock !== undefined) filter.stock.$gte = Number(minStock);
        if (maxStock !== undefined) filter.stock.$lte = Number(maxStock);
      }

      const skip = (page - 1) * limit;

      const accessories = await accessory
        .find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

      const total = await accessory.countDocuments(filter);

      resolve({
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        data: accessories,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getOne = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessoryFound = await accessory.findById(id);
      if (accessoryFound) {
        resolve({
          status: "Found accessory",
          data: accessoryFound,
          message: "Found accessory",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const update = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (id.length !== 24) {
        resolve({
          status: "Error",
          message: "Invalid Id",
        });
        return;
      }
      const currentAccessory = await accessory.findById(id);
      if (!currentAccessory) {
        resolve({
          status: "Error",
          message: "Accessory not found",
        });
      }
      const updatedAccessory = await accessory.findByIdUpdate(
        { _id: id },
        data,
        { new: true }
      );
      resolve({
        status: "Updated",
        data: updatedAccessory,
        message: "Accessory updated"
      })
    } catch (e) {
      reject(e);
    }
  });
};
const deleteAccessory = (id)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            await accessory.findByIdAndDelete({_id: id})
            resolve({
                status: "Deleted",
                message: "Delete successfully"
            })
        }catch(e){
            reject(e)
        }
    })
}

module.exports = {
    create,
    getAll,
    getOne,
    update,
    deleteAccessory
}