const product = require("../Models/product");

const create = (data) => {
  return new Promise(async (resolve, rejects) => {
    try {
      const newProduct = await product.create(data);
      if (newProduct) {
        resolve({
          status: "Created",
          data: newProduct,
          message: "Created new product",
        });
      }
    } catch (err) {
      rejects(err);
    }
  });
};

const getAll = (limit, number, search, sortDir, cateId, priceTo, priceFrom) => {
  return new Promise(async (resolve, reject) => {
    try {
      let filter = {};

      if (search) {
        filter.name = { $regex: search, $options: "i" };
      }

      if (cateId) {
        filter.categoryId = cateId;
      }

      if (priceFrom || priceTo) {
        filter.price = {};
        if (priceFrom) filter.price.$gte = priceFrom;
        if (priceTo) filter.price.$lte = priceTo;
      }

      let sortOption = {};
      if (sortDir) {
        sortOption.price = sortDir === "desc" ? -1  : sortDir === "asc" ? 1 : undefined
      }

      const skip = (number - 1) * limit;

      const allProduct = await product
        .find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(limit);

      const total = await product.countDocuments(filter);

      if (allProduct) {
        resolve({
          status: "Get all",
          data: allProduct,
          total: total,
          totalPages: Math.ceil(total / limit),
          currentPage: number,
          message: "Get all product with pagination",
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

const getOne = (id) => {
  return new Promise(async (resolve, rejects) => {
    try {
      if (id.length !== 24) {
        resolve({
          status: "Error",
          message: "category not found",
        });
        return;
      }
      const productFind = await product.findById(id);
      if (productFind) {
        resolve({
          status: "Found product",
          data: productFind,
          message: "Found product",
        });
      }
    } catch (err) {
      rejects(err);
    }
  });
};

const update = (id, data) => {
  return new Promise(async (resolve, rejects) => {
    try {
      if (id.length !== 24) {
        resolve({
          status: "Error",
          message: "product not found",
        });
        return;
      }
      const currentProduct = await product.findById(id);
      if (!currentProduct) {
        resolve({
          status: "Error",
          message: "product not found",
        });
        return;
      }
      const updateProduct = await product.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (updateProduct) {
        resolve({
          status: "Updated",
          data: updateProduct,
          message: "Updated product",
        });
      }
    } catch (err) {
      rejects(err);
    }
  });
};

const deleteProduct = (id) => {
  return new Promise(async (resolve, rejects) => {
    try {
      if (id.length !== 24) {
        resolve({
          status: "Error",
          message: "product not found",
        });
        return;
      }
      const productDelete = await product.findByIdAndDelete(id);
      if (productDelete) {
        resolve({
          status: "Deleted",
          message: "Deleted product",
        });
      }
    } catch (err) {
      rejects(err);
    }
  });
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  deleteProduct,
};
