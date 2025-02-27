const user = require("../Models/user");
const bcrypt = require('bcrypt')
require('dotenv').config()

const createUser = (data) => {
  return new Promise(async (resolve, rejects) => {
    try {
      const password = data.password;
      const hashPass = await bcrypt.hash(password, 10)
      const newUser = await user.create({...data, password: hashPass});
      if (newUser) {
        resolve({
          status: "Created",
          data: newUser,
          message: "User created",
        });
      }
    } catch (e) {
      rejects(e);
    }
  });
};

const getAll = () => {
  return new Promise(async (resolve, rejects) => {
    try {
      const allUsers = await user.find({});
      if (allUsers) {
        resolve({
          status: "Found",
          data: allUsers,
          message: "All users found",
        });
      }
    } catch (e) {
      rejects(e);
    }
  });
};

const getUser = (id) => {
  return new Promise(async (resolve, rejects) => {
    try {
      const userId = await user.findById(id);
      if (userId) {
        resolve({
          status: "Found",
          data: userId,
          message: "User found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (id.length !== 24) {
        resolve({
          status: "Error",
          message: "User not found",
        });
        return;
      }
      const currentUser = await user.findById(id);
      if (!currentUser) {
        resolve({
          status: "Error",
          message: "User not found",
        });
      }
      const newUser = await user.findByIdAndUpdate({ _id: id }, data, {
        new: true,
      });
      resolve({
        status: "Updated",
        data: newUser,
        message: "User updated",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await user.findByIdAndDelete({ _id: id });
      resolve({
        status: "Deleted",
        message: "User deleted",
      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createUser,
  deleteUser,
  getAll,
  getUser,
  updateUser,
};
