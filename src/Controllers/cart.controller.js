const Joi = require("joi");
const cartService = require("../Services/cart.service");

const create = async (req, res) => {
  try {
    const schema = Joi.object({
      item: Joi.array()
        .items(
          Joi.object({
            itemType: Joi.string().valid("Pet", "Food", "Accessory").required(),
            itemId: Joi.string().required(),
            quantity: Joi.number().min(1).required(),
            price: Joi.number().required(),
            totalPrice: Joi.number().allow(null),
          })
        )
        .required(),
      userId: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const response = await cartService.create(value);
    return res.status(200).json(response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

const getCartOfUser = async (req, res) => {
  try {
    const idUser = req.params.id;
    if (!idUser) {
      return res.status(500).json({ message: "Id is required" });
    }
    const response = await cartService.getByUser(idUser);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const cartUpdate = req.body;
    if (!id) {
      return res.status(500).json({ status: 500, message: "Id is required" });
    }
    const response = await cartService.update(id, cartUpdate);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteCart = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await cartService.clearCart(id);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  create,
  getCartOfUser,
  update,
  deleteCart,
};
