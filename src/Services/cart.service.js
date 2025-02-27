const cart = require("../Models/cart");

const create = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newCart = await cart.create(data);
      if (newCart) {
        resolve({
          status: "Created",
          data: newCart,
          message: "Created appointment",
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

const getByUser = (idUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cartUser = await cart.find({ userId: idUser });
      if (cartUser) {
        resolve({
          status: "Founded",
          data: cartUser,
          message: "Founded",
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

const update = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (id.length !== 24) {
        resolve({
          status: "Error",
          message: "Invalid id",
        });
        return;
      }
      const updateCart = await cart.findById({ id });
      if (!updateCart) {
        resolve({
          status: "Cart not found",
          message: "Cart not found",
        });
      }
      updateCart.item = cart.item.map((item) => {
        const updateData = data.find(
          (itemData) =>
            (itemData.idProduct && item.idProduct === itemData.idProduct) ||
            (itemData.idPet && item.idPet === itemData.idPet)
        );
        if(updateData){
          return{
            ...item.toObject,
            quantity: updateData.quantity,
            totalPrice: updateData.quantity * item.price
          }
        }
        return item;
      });
      resolve({
        status: "Updated",
        data: updateCart,
        message: "Update successfully",
      });
    } catch (err) {
      reject(err);
    }
  });
};

const clearCart = (idUser) => {
  return new Promise(async (resolve, reject) => {
    if (idUser.length !== 24) {
      resolve({
        status: "Error",
        message: "Invalid id",
      });
    }
    await cart.deleteOne({ userId: idUser });
    resolve({
      status: "Deleted",
      message: "Cart deleted",
    });
  });
};

module.exports = {
  create,
  getByUser,
  update,
  clearCart,
};
