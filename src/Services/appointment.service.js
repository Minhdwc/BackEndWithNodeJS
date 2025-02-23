const appointment = require("../Models/appointment");
const createAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
  try {
      const newAppointment = await appointment.create(data);
      if (newAppointment) {
        resolve({
          status: "Created",
          data: newAppointment,
          message: "Created appointment",
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
      const allAppointment = await appointment.find();
      if (allAppointment) {
        resolve({
          status: "Get all",
          data: allAppointment,
          message: "Get all appointment",
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
      const appointment = await appointment.findById(id);
      if (appointment) {
        resolve({
          status: "Found appointment",
          data: appointment,
          message: "Found appointment",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const getByIdUser = (idUser)=>{
  return new Promise(async(resolve, reject)=>{
  try{
      const appointmentUser = await appointment.find({userId: idUser})
      resolve({
        status: "Found appointment",
        data: appointmentUser,
        message:  "Found appointment"
      })
    }catch(e){
      reject(e)
    }
  })
}
const updateAppointment = (id, data) => {
  return new Promise(async (resolve, reject) => {
  try {
      if (id.length !== 24) {
        resolve({
          status: "Error",
          message: "appointment not found",
        });
        return;
      }
      const currentAppointment = await appointment.findById({ _id: id });
      if (!currentAppointment) {
        resolve({
          status: "Error",
          message: "appointment not found",
        });
      }
      const updateAppointment = await appointment.findByIdAndUpdate({ _id: id }, data, {
        new: true,
      });
      resolve({
        status: "Updated",
        data: updateAppointment,
        message: "Update successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};
const deleteApointment = (id)=>{
  return new Promise(async(resolve, reject)=>{
    try{
            await appointment.findByIdAndDelete({_id: id});
            resolve({
                status: "Deleted",
                message:"Delete successfully",
            })
          }catch(e){
            reject(e);
          }
        })
}

module.exports={
    createAppointment,
    deleteApointment,
    getAll,
    getOne,
    updateAppointment,
    getByIdUser
}