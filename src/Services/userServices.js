const user = require("../Models/user");

const createUser = (data) => {
  try {
    new Promise(async (resolve, rejects) => {
      const newUser = await user.create(data);
      if (newUser) {
        resolve({
          status: "Created",
          data: newUser,
          message: "User created",
        });
      }
    });
  } catch (e) {
    rejects(e);
  }
};

const getAll = () => {
  try {
    new Promise(async (resolve, rejects) => {
      const allUsers = await user.find({});
      if (allUsers) {
        resolve({
          status: "Found",
          data: allUsers,
          message: "All users found",
        });
      }
    });
  } catch (e) {
    rejects(e);
  }
};

const getUser = (id) => {
  try {
    new Promise(async (resolve, rejects) => {
      const userId = await user.findById(id);
      if (userId) {
        resolve({
          status: "Found",
          data: userId,
          message: "User found",
        });
      }
    });
  } catch (e) {
    reject(e);
  }
};

const updateUser = (id, data) => {
  try {
    new Promise(async (resolve, reject) => {
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
    });
  } catch (e) {
    reject(e);
  }
};

const deleteUser = (id)=>{
    try{
        new Promise(async(resolve, reject)=>{
            const userFind = await user.findByIdAndDelete({ _id: id})
            resolve({
                status: "Deleted",
                message: "User deleted",
            })
        })
    }catch(e){
        reject(e);
    }
}
module.exports = [
    createUser,
    deleteUser,
    getAll,
    getUser,
    updateUser
]