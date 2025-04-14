const brand = require("../Models/brand");

const createBrand = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newBrand = await brand.create(data);
      if (newBrand) {
        resolve({
          status: "Created",
          data: newBrand,
          message: "Created brand",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const getAll = (limit, page) => {
  return new Promise(async (resolve, reject) => {
    try {
      const allBrand = await brand
        .find({})
        .sort({ createdAt: -1 })
        .skip(page * limit)
        .limit(limit);
      const totalBrand = await brand.countDocuments();
      resolve({
        status: "Success",
        data: allBrand,
        total: totalBrand,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        message: "Get all brands",
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getOne = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const brandFind = await brand.findById(id);
      if (brandFind) {
        resolve({
          status: "Found brand",
          data: brandFind,
          message: "Found brand",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const updateBrand = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (id.length !== 24) {
        resolve({
          status: "Error",
          message: "Invalid brand ID",
        });
        return;
      }
      const currentBrand = await brand.findById(id);
      if (!currentBrand) {
        resolve({
          status: "Error",
          message: "Brand not found",
        });
      }
      const updateBrand = await brand.findByIdAndUpdate(id, data, {
        new: true,
      });
      resolve({
        status: "Updated",
        data: updateBrand,
        message: "Update successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};
const deleteBrand = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await brand.findByIdAndDelete(id);
      resolve({
        status: "Deleted",
        message: "Delete sucessfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports={
    createBrand,
    deleteBrand,
    getAll,
    getOne,
    updateBrand
}
