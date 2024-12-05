const cart = require("../models/cart");
const User = require("../models/user");
const createCart = (data) => {
	return new Promise(async (resolve, reject) => {
		const { total, item, userId } = data;
		try {
			const userCheck = await User.findOne({ _id: userId });
		} catch (e) {
			return reject(e);
		}
	});
};
