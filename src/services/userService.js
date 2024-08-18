const user = require("../models/user");
const bcrypt = require("bcrypt");
const CreateUserService = (data) => {
  return new Promise(async (resolve, reject) => {
    const { name, dateOfBirth, email, password, comfirmPassword, role } = data;
    const checkEmail = await user.findOne({ email: email });
    try {
      if (checkEmail !== null) {
        resolve({
          status: "error",
          message: "Email is already",
        });
        return;
      }
      const hash = bcrypt.hashSync(password, 10);
      const createUser = await user.create({
        name,
        dateOfBirth,
        email,
        password: hash,
        comfirmPassword: hash,
        role,
      });
      if (createUser) {
        resolve({
          status: "created",
          message: "User created successfully",
          data: createUser,
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
      const allUser = await user.find({});
      resolve({status:"success", message:"All users found", data: allUser});
    } catch (e) {
      reject(e);
    }
  });
};
const getDetailService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const User = await user.findOne({ _id: id });
      resolve({
        status: "success",
        message: "get detail user successfully",
        data: User,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {  
  CreateUserService,
  getAll, 
  getDetailService
};
