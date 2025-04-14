const food = require("../Models/food");

const create = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newFood = await food.create(data);
      if (newFood) {
        resolve({
          status: "Created",
          data: newFood,
          message: "Created food",
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

      const accessories = await food
        .find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

      const total = await food.countDocuments(filter);

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
      const foodFound = await food.findById(id);
      if (foodFound) {
        resolve({
          status: "Found food",
          data: foodFound,
          message: "Found food",
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
      const currentFood = await food.findById(id);
      if (!currentFood) {
        resolve({
          status: "Error",
          message: "Food not found",
        });
      }
      const updatedFood = await food.findByIdUpdate(
        { _id: id },
        data,
        { new: true }
      );
      resolve({
        status: "Updated",
        data: updatedFood,
        message: "Food updated"
      })
    } catch (e) {
      reject(e);
    }
  });
};
const deleteFood = (id)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            await food.findByIdAndDelete({_id: id})
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
    deleteFood
}