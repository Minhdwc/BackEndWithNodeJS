const order = require("../Models/order");
const createOrder = (data) => {
  return new Promise(async (resolve, reject) => {
  try {
      const newOrder = await order.create(data);
      if (newOrder) {
        resolve({
          status: "Created",
          data: newOrder,
          message: "Created order",
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
      const allOrder = await order.find();
      if (allOrder) {
        resolve({
          status: "Get all",
          data: allOrder,
          message: "Get all order",
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
      const allOrder = await order.findById(id);
      if (allOrder) {
        resolve({
          status: "Found order",
          data: allOrder,
          message: "Found order",
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
          message: "Order not found",
        });
        return;
      }
      const currentOrder = await order.findById({ _id: id });
      if (!currentOrder) {
        resolve({
          status: "Error",
          message: "Order not found",
        });
      }
      const updateOrder = await order.findByIdAndUpdate({ _id: id }, data, {
        new: true,
      });
      resolve({
        status: "Updated",
        data: updateOrder,
        message: "Update successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};
const deleteOrder = (id)=>{
  return new Promise(async(resolve, reject)=>{
    try{
            await order.findByIdAndDelete({_id: id});
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
    createOrder,
    deleteOrder,
    getAll,
    getOne,
    update
}