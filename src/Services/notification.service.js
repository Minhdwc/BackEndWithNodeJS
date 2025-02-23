const notification = require("../Models/notification");
const createNotification = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newNotification = await notification.create(data);
      if (newNotification) {
        resolve({
          status: "Created",
          data: newNotification,
          message: "Created pet",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const getNotificationOfUser = (idUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const notiUser = await notification.find({ userId: idUser });
      if (notiUser) {
        resolve({
          status: "Found",
          data: notiUser,
          message: "All notifications of your notifications of user",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateNoti =(id, data)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      if (id.length !== 24) {
        resolve({
          status: "Error",
          message: "Pet not found",
        });
        return;
      }
      const notiOfUser = await notification.findAndUpdate({userId: id}, data, {new: true})
      resolve({
        status: "Updated",
        message: "Updated notification",
        data: notiOfUser
      })

    }catch (e) {
      reject(e)
    }
  })
} 
  module.exports = {
    createNotification,
    getNotificationOfUser,
    updateNoti
  }