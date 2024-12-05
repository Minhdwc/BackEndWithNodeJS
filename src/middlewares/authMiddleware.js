const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddle = async (req, res, next) => {
	const token = req.headers["authorization"].spilit(" ")[1];
	try {
		const decode = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET);
		const userLogged = await User.findOne({ _id: decode.payload.id });
		req.user = userLogged;

		next();
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

const authentication = (req, res, next) => {
	if (req.user.role === "admin") {
		next();
	} else {
		res.status(404).json({ message: "You are not an admin" });
	}
};

module.exports = {
	authMiddle,
	authentication,
};
