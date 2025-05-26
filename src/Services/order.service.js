const order = require("../Models/order");
const Cart = require("../Models/cart");

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

const createOrderFromCart = (userId, deliveryInfo, paymentMethod) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cart = await Cart.findOne({ userId: userId });
      if (!cart) {
        throw new Error('Cart not found');
      }

      const totalQuantity = cart.item.reduce((sum, item) => sum + item.quantity, 0);
      const total = cart.item.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      const orderData = {
        userId: cart.userId,
        item: cart.item,
        quantity: totalQuantity,
        total: total,
        delivery_location: {
          display_name: deliveryInfo.display_name,
          lat: deliveryInfo.lat,
          lon: deliveryInfo.lon,
          address: deliveryInfo.address
        },
        paymentMethod: paymentMethod,
        paymentStatus: 'Chưa thanh toán',
        shippingStatus: 'Chưa giao',
        isCancelled: false
      };

      const newOrder = await order.create(orderData);

      resolve({
        status: 'Created',
        data: newOrder,
        message: 'Order successfully.'
      });
    } catch (error) {
      reject(error);
    }
  });
};

const confirmPaymentAndClearCart = (orderId, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updatedOrder = await order.findByIdAndUpdate(
        orderId,
        {
          paymentStatus: 'Đã thanh toán',
          shippingStatus: 'Đang giao'
        },
        { new: true }
      );

      if (!updatedOrder) {
        throw new Error('Order not found');
      }

      await Cart.findOneAndDelete({ userId });

      resolve({
        status: 'Success',
        data: updatedOrder,
        message: 'Payment confirmed and cart cleared successfully'
      });
    } catch (error) {
      reject(error);
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

const deleteOrder = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await order.findByIdAndDelete({ _id: id });
      resolve({
        status: "Deleted",
        message: "Delete successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createOrder,
  createOrderFromCart,
  confirmPaymentAndClearCart,
  deleteOrder,
  getAll,
  getOne,
  update
};