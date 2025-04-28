const cart = require("../Models/cart");
const Pet = require("../Models/pet");
const Product = require("../Models/product");
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

const update = (id, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = body.item;

      if (!Array.isArray(data)) {
        return resolve({
          status: "Error",
          message: "Invalid data",
        });
      }

      if (id.length !== 24) {
        return resolve({
          status: "Error",
          message: "Invalid id",
        });
      }

      const updateCart = await cart.findOne({ userId: id });

      if (!updateCart) {
        return resolve({
          status: "Cart not found",
          message: "Cart not found",
        });
      }

      updateCart.item = updateCart.item.map((item) => {
        const matchedItem = data.find(
          (itemData) =>
            (itemData.idProduct &&
              String(item.idProduct) === String(itemData.idProduct)) ||
            (itemData.idPet && String(item.idPet) === String(itemData.idPet))
        );

        if (matchedItem) {
          return {
            ...item.toObject(),
            quantity: matchedItem.quantity,
            totalPrice: matchedItem.quantity * item.price,
          };
        }

        return item;
      });

      for (const incomingItem of data) {
        const matchedItem = updateCart.item.find(
          (item) =>
            (incomingItem.idProduct &&
              String(incomingItem.idProduct) === String(item.idProduct)) ||
            (incomingItem.idPet &&
              String(incomingItem.idPet) === String(item.idPet))
        );

        if (!matchedItem) {
          let price = null;

          if (incomingItem.idPet) {
            const petData = await Pet.findById(incomingItem.idPet).lean();
            if (petData) {
              price = petData.price;
            }
          } else if (incomingItem.idProduct) {
            const productData = await Product.findById(
              incomingItem.idProduct
            ).lean();
            if (productData) {
              price = productData.price;
            }
          }

          if (typeof price === "number" && !isNaN(price)) {
            updateCart.item.push({
              idPet: incomingItem.idPet || null,
              idProduct: incomingItem.idProduct || null,
              quantity: incomingItem.quantity,
              price,
              totalPrice: incomingItem.quantity * price,
            });
          } else {
            console.error("Invalid price for item:", incomingItem);
            return resolve({
              status: "Error",
              message: "Price is required and must be a valid number",
            });
          }
        }
      }

      await updateCart.save();

      resolve({
        status: "Updated",
        data: updateCart,
        message: "Cart updated successfully",
      });
    } catch (err) {
      reject(err);
    }
  });
};

const clearCart = (id) => {
  return new Promise(async (resolve, reject) => {
    if (id.length !== 24) {
      resolve({
        status: "Error",
        message: "Invalid id",
      });
    }
    await cart.findByIdAndDelete(id );
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
