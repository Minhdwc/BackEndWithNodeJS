const pet = require("../Models/pet");
const createPet = (data) => {
  return new Promise(async (resolve, reject) => {
    try {      
      const newPet = await pet.create(data);
      
      if (newPet) {
        resolve({
          status: "Created",
          data: newPet,
          message: "Created pet",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const getAll = (limit, page, generic, cateId, gender, color) => {
  return new Promise(async (resolve, reject) => {
    try {
      let filter = {};
      if (generic) {
        filter.generic = { $regex: generic, $options: "i" };
      }
      if (cateId) {
        filter.cateId = cateId;
      }
      const validGenders = ["Đực", "Cái"];
      if (gender && validGenders.includes(gender)) {
        filter.gender = gender;
      }
      if (color) {
        filter.color = { $regex: color, $options: "i" };
      }
      const allPet = await pet
        .find(filter)
        .sort({createAt: -1})
        .skip(page*limit)
        .limit(limit);

      const total = await pet.countDocuments(filter);

      resolve({
        status: "success",
        data: allPet,
        total: total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        message: "Get all pets",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getOne = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const petFind = await pet.findById(id);
      if (petFind) {
        resolve({
          status: "Found pet",
          data: petFind,
          message: "Found pet",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const updateOnePet = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (id.length !== 24) {
        resolve({
          status: "Error",
          message: "Pet not found",
        });
        return;
      }
      const currentPet = await pet.findById(id);
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
    } catch (e) {
      reject(e);
    }
  });
};
const deleteOnePet = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await pet.findByIdAndDelete({ _id: id });
      resolve({
        status: "Deleted",
        message: "Delete successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createPet,
  deleteOnePet,
  getAll,
  getOne,
  updateOnePet,
};
