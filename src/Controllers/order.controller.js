const Joi = require('joi')
const OrderService = require('../Services/order.service')

const create = async (req, res) => {
    try {
        const schema = Joi.object({
            userId: Joi.string().required(),
            item: Joi.array().items(
                Joi.object({
                    itemType: Joi.string().valid('Pet', 'Food', 'Accessory').required(),
                    itemId: Joi.string().required(),
                    quantity: Joi.number().required(),
                    price: Joi.number().required()
                })
            ).required(),
            quantity: Joi.number().required(),
            total: Joi.number().required(),
            delivery_location: Joi.object({
                display_name: Joi.string().required(),
                lat: Joi.number().required(),
                lon: Joi.number().required(),
                address: Joi.object().required()
            }).required(),
            delivery_note: Joi.string(),
            paymentMethod: Joi.string().valid('Tiền mặt', 'Chuyển khoản'),
            paymentStatus: Joi.string().valid('Chưa thanh toán', 'Đang thanh toán', 'Đã thanh toán'),
            shippingStatus: Joi.string().valid('Chưa giao', 'Đang giao', 'Đã giao'),
            isCancelled: Joi.boolean()
        })
        const { error, values } = schema.validate(req.body)
        if (error) {
            return res.status(500).json({ message: error.message })
        }
        const data = req.body
        const response = await OrderService.createOrder(data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
}
const getOne = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(500).json({ message: "Id is required" });
        }
        const response = await OrderService.getOne(id)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}
const getAll = async (req, res) => {
    try {
        const response = await OrderService.getAll()
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}
const update = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(500).json({ message: "Id is required" });
        }
        const data = req.body
        const updateOrder = await OrderService.update(id, data)
        return res.status(200).json(updateOrder)
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}
const deleteOrder = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(500).json({ message: "Invalid id" })
        }
        const response = await OrderService.deleteOrder(id)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const createFromCart = async (req, res) => {
    try {
        const schema = Joi.object({
            delivery_location: Joi.object({
                display_name: Joi.string().required(),
                lat: Joi.number().required(),
                lon: Joi.number().required(),
                address: Joi.object().required()
            }).required(),
            delivery_note: Joi.string(),
            paymentMethod: Joi.string().valid('Tiền mặt', 'Chuyển khoản').required()
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.message });
        }

        const userId = req.user._id;
        const { delivery_location, delivery_note, paymentMethod } = req.body;

        const result = await OrderService.createOrderFromCart(
            userId,
            { ...delivery_location, note: delivery_note },
            paymentMethod
        );

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const confirmPayment = async (req, res) => {
    try {
        const schema = Joi.object({
            orderId: Joi.string().required()
        });

        const { error } = schema.validate(req.params);
        if (error) {
            return res.status(400).json({ message: error.message });
        }

        const userId = req.user._id;
        const { orderId } = req.params;

        const result = await OrderService.confirmPaymentAndClearCart(orderId, userId);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    create,
    createFromCart,
    confirmPayment,
    getOne,
    getAll,
    update,
    deleteOrder
}