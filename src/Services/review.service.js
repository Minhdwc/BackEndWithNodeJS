const review = require("../Models/review");

const create = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newReview = await review.create(data);
      if (newReview) {
        resolve({
          status: "Created",
          data: newReview,
          message: "Created appointment",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const getAll = (limit, page, sorDate) => {
  return new Promise(async (resolve, reject) => {
    try {
      sortOption = {};
      if (sorDate) {
        sortOption.timeStamp =
          sorDate === "desc" ? -1 : sorDate === "asc" ? 1 : undefined;
      }

      const allReview = await review
        .find()
        .sort(sortOption)
        .skip(limit * page)
        .limit(limit);
      if (allReview) {
        resolve({
          status: "Get all",
          data: allReview,
          message: "Get all review",
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
      const reviewFound = await review.findById(id);
      if (reviewFound) {
        resolve({
          status: "Found review",
          data: reviewFound,
          message: "Found review",
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
          message: "review not found",
        });
        return;
      }
      const currentReview = await review.findById({ _id: id });
      if (!currentReview) {
        resolve({
          status: "Error",
          message: "review not found",
        });
      }
      const updateReview = await review.findByIdAndUpdate({ _id: id }, data, {
        new: true,
      });
      resolve({
        status: "Updated",
        data: updateReview,
        message: "Update successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};
const deleteReview = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await review.findByIdAndDelete({ _id: id });
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
  create,
  getOne,
  getAll,
  update,
  deleteReview,
};
