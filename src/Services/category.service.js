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
  const getAll = (limit, page, search, typeOf ) => {
    return new Promise(async (resolve, reject) => {
      try {
        let query = {};
  
        if (search && search!=="") {
          query.name = { $regex: search, $options: "i" };
        }
  
        if (typeOf) {
          query.type = typeOf;
        }
  
  
        const allcategory = await category
          .find(query)
          .skip(limit*page)
          .limit(limit);
  
        const total = await category.countDocuments(query);
  
        if (allcategory) {
          resolve({
            status: "Get all",
            data: allcategory,
            total: total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            message: "Get all category with pagination",
          });
        }
      } catch (err) {
        reject(err);
      }
    });
  };
const getByType =(type)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      const typeCate = await category.find({typeOf: type})
      if(typeCate){
        resolve({
          status: "Found",
          data: typeCate,
          message: "Type of category"
        })
      }
    }catch(e){
      reject(e);
    }
  })
}
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
  getByType
};
