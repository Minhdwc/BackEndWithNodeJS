const notification = require("../Models/notification");
const createNotification = (data) => {
  try {
    new Promise(async (resolve, reject) => {
      const newNotification = await notification.create(data);
      if (newNotification) {
        resolve({
          status: "Created",
          data: newNotification,
          message: "Created pet",
        });
      }
    });
  } catch (e) {
    reject(e);
  }
};
const getNotificationOfUser = (idUser) =>{
    try{
        new Promise(async(resolve, reject)=>{
            const notiUser = await notification.find({ userId: idUser});
            if(notiUser){
                resolve({
                    status: "Found",
                    data: notiUser,
                    message: "All notifications of your notifications of user"
                })
            }
        })
    }catch(e){
        reject(e);
    }
}
module.exports={
    createNotification,
    getAll,
    getNotificationOfUser
}