const cart = require("../Models/cart");
const Pet = require("../Models/pet");
const Food = require("../Models/food");
const Accessory = require("../Models/accessory");
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
          status: "Found",
          data: cartUser,
          message: "Cart found successfully",
        });
      } else {
        resolve({
          status: "Not Found",
          data: [],
          message: "No cart found for this user",
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

const update = (userId, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = body.item;

      if (!Array.isArray(data)) {
        return resolve({
          status: "Error",
          message: "Items must be provided as an array",
        });
      }

      if (!userId || userId.length !== 24) {
        return resolve({
          status: "Error",
          message: "Invalid user ID",
        });
      }

      const updateCart = await cart.findOne({ userId });
      if (!updateCart) {
        return resolve({
          status: "Error",
          message: "Cart not found for this user",
        });
      }

      updateCart.item = updateCart.item || [];

      const updatedItems = updateCart.item.map((item) => {
        const matchedItem = data.find(
          (itemData) =>
            itemData.itemType &&
            itemData.itemId &&
            itemData.itemType === item.itemType &&
            String(itemData.itemId) === String(item.itemId)
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

      const newItems = await Promise.all(
        data.map(async (incomingItem) => {
          if (!incomingItem.itemId || !incomingItem.itemType) {
            return null;
          }

          const alreadyExists = updatedItems.some(
            (item) =>
              item.itemType === incomingItem.itemType &&
              String(item.itemId) === String(incomingItem.itemId)
          );

          if (alreadyExists) {
            return null;
          }

          let price = null;
          try {
            switch (incomingItem.itemType) {
              case "Pet":
                const petData = await Pet.findById(incomingItem.itemId).lean();
                price = petData?.price;
                break;
              case "Food":
                const foodData = await Food.findById(
                  incomingItem.itemId
                ).lean();
                price = foodData?.price;
                break;
              case "Accessory":
                const accessoryData = await Accessory.findById(
                  incomingItem.itemId
                ).lean();
                price = accessoryData?.price;
                break;
              default:
                console.log(`Invalid item type: ${incomingItem.itemType}`);
                return;
            }
          } catch (error) {
            console.error(error);
            return;
          }

          return {
            itemType: incomingItem.itemType,
            itemId: incomingItem.itemId,
            quantity: incomingItem.quantity,
            price,
          };
        })
      );

      updateCart.item = [
        ...updatedItems,
        ...newItems.filter((item) => item !== null),
      ];

      const savedCart = await updateCart.save();

      resolve({
        status: "Updated",
        data: savedCart,
        message: "Cart updated successfully",
      });
    } catch (err) {
      console.error("Error updating cart:", err);
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
    await cart.findByIdAndDelete(id);
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
