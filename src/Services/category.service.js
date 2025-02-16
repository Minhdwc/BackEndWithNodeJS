const category = require("../Models/category");
const createCategory = (data) => {
  return new Promise(async (resolve, reject) => {
  try {
      const newCategory = await category.create(data);
      if (newCategory) {
        resolve({
          status: "Created",
          data: newCategory,
          message: "Created category",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const getAll = () => {
  return new Promise(async (resolve, reject) => {
  try {
      const allCategory = await category.find();
      if (allCategory) {
        resolve({
          status: "Get all",
          data: allCategory,
          message: "Get all category",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const getOne = (id) => {
  return new Promise(async (resolve, reject) => {
  try {
      const cate = await category.findById(id);
      if (cate) {
        resolve({
          status: "Found category",
          data: cate,
          message: "Found category",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const updateCategory = (id, data) => {
  return new Promise(async (resolve, reject) => {
  try {
      if (id.length !== 24) {
        resolve({
          status: "Error",
          message: "category not found",
        });
        return;
      }
      const currentCategory = await category.findById({ _id: id });
      if (!currentCategory) {
        resolve({
          status: "Error",
          message: "category not found",
        });
      }
      const updateCategory = await category.findByIdAndUpdate(
        { _id: id },
        data,
        {
          new: true,
        }
      );
      resolve({
        status: "Updated",
        data: updateCategory,
        message: "Update successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};
const deleteCategory = (id) => {
  return new Promise(async (resolve, reject) => {
  try {
      await category.findByIdAndDelete({ _id: id });
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
  createCategory,
  deleteCategory,
  getAll,
  getOne,
  updateCategory,
};
