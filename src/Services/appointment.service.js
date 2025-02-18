const appointment = require("../Models/appointment");
const createAppointment = (data) => {
  try {
    new Promise(async (resolve, reject) => {
      const newAppointment = await appointment.create(data);
      if (newAppointment) {
        resolve({
          status: "Created",
          data: newAppointment,
          message: "Created appointment",
        });
      }
    });
  } catch (e) {
    reject(e);
  }
};
const getAll = () => {
  try {
    new Promise(async (resolve, reject) => {
      const allAppointment = await appointment.find();
      if (allAppointment) {
        resolve({
          status: "Get all",
          data: allAppointment,
          message: "Get all appointment",
        });
      }
    });
  } catch (e) {
    reject(e);
  }
};
const getOne = (id) => {
  try {
    new Promise(async (resolve, reject) => {
      const appointment = await appointment.findById(id);
      if (appointment) {
        resolve({
          status: "Found appointment",
          data: appointment,
          message: "Found appointment",
        });
      }
    });
  } catch (e) {
    reject(e);
  }
};
const getByIdUser = (idUser)=>{
  try{
    return new Promise(async(resolve, reject)=>{
      const appointmentUser = await appointment.find({userId: idUser})
      resolve({
        status: "Found appointment",
        data: appointmentUser,
        message:  "Found appointment"
      })
    })
  }catch(e){
    reject(e)
  }
}
const updateAppointment = (id, data) => {
  try {
    new Promise(async (resolve, reject) => {
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
    });
  } catch (e) {
    reject(e);
  }
};
const deleteApointment = (id)=>{
    try{
        return new Promise(async(resolve, reject)=>{
            await appointment.findByIdAndDelete({_id: id});
            resolve({
                status: "Deleted",
                message:"Delete successfully",
            })
        })
    }catch(e){
        reject(e);
    }
}

module.exports={
    createAppointment,
    deleteApointment,
    getAll,
    getOne,
    updateAppointment,
    getByIdUser
}