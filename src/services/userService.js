const user = require("../models/user");
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("./jwtService");
const CreateUserService = (data) => {
	return new Promise(async (resolve, reject) => {
		const { name, dateOfBirth, email, password, comfirmPassword, role, image } =
			data;
		const checkEmail = await user.findOne({ email: email });
		try {
			if (checkEmail !== null) {
				resolve({
					status: "error",
					message: "Email is already",
				});
				return;
			}
			const hash = bcrypt.hashSync(password, 10);
			const createUser = await user.create({
				name,
				dateOfBirth,
				email,
				password: hash,
				comfirmPassword: hash,
				role,
			});
			if (createUser) {
				resolve({
					status: "created",
					message: "User created successfully",
					data: createUser,
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
			const allUser = await user.find({});
			resolve({ status: "success", message: "All users found", data: allUser });
		} catch (e) {
			reject(e);
		}
	});
};
const getDetailService = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const User = await user.findOne({ _id: id });
			resolve({
				status: "success",
				message: "get detail user successfully",
				data: User,
			});
		} catch (e) {
			reject(e);
		}
	});
};
const updateUserService = (id, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (id.length !== 24) {
				resolve({ status: "error", message: "Invalid id" });
				return;
			}
			const checkUser = await user.findOne({ _id: id });
			if (!checkUser) {
				resolve({ status: "error", message: "User not found" });
				return;
			}
			const updateUserService = await user.findByIdAndUpdate(id, data, {
				new: true,
			});
			resolve({
				status: "Success",
				message: "Update success",
				data: updateUserService,
			});
		} catch (e) {
			reject(e);
		}
	});
};
const loginService = (emailS, password) => {
	return new Promise(async (resolve, reject) => {
		try {
			const emailUser = await user.findOne({ email: emailS });
			if (!emailUser) {
				resolve({
					status: "Error",
					message: "User not found",
				});
				return;
			}
			const checkPass = await bcrypt.compare(password, emailUser.password);
			if (!checkPass) {
				resolve({
					status: "Error",
					message: "Password is incorrect",
				});
				return;
			}
			const data = {
				_id: emailUser.id,
				name: emailUser.name,
				email: emailUser.email,
				role: emailUser.role,
			};
			const access_token = await generateAccessToken({
				data,
			});
			const refresh_token = await generateRefreshToken({
				data,
			});

			resolve({
				status: "Success",
				message: "Login successful",
				data: {
					user: {
						_id: emailUser.id,
						name: emailUser.name,
						email: emailUser.email,
						role: emailUser.role,
					},
					access_token: access_token,
					refresh_token: refresh_token,
				},
			});
		} catch (e) {
			reject(e);
		}
	});
};
module.exports = {
	CreateUserService,
	getAll,
	getDetailService,
	updateUserService,
	loginService,
};
