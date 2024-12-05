const category = require("../models/category");
const CreateCategoryService = (data) => {
	return new Promise(async (resolve, reject) => {
		const { name } = data;
		const createCate = await category.create({
			name,
		});
		if (createCate) {
			return resolve({
				status: "Created",
				message: "Category created successfully",
				data: createCate,
			});
		}
	});
};

const updateCate = (id, data) => {
	try {
		return new Promise(async (resolve, reject) => {
			if (id.length !== 24) {
				resolve({ status: "Error", message: "Invalid Id" });
				return;
			}
			const checkCate = await category.findOne({ _id: id });
			if (!checkCate) {
				resolve({ status: "Error", message: "Category not found" });
			} else {
				const updateCate = category.findByIdAndUpdate(id, data, { new: true });
				resolve({
					status: "Updated",
					message: "Category updated",
					data: updateCate,
				});
			}
		});
	} catch (e) {
		reject(e);
	}
};

const deleteCategory = (id) => {
	try {
		return new Promise(async (resolve, reject) => {
			await category.findByIdAndDelete({ _id: id });
			resolve({
				status: "Deleted",
				message: "Category deleted",
			});
		});
	} catch (e) {
		reject(e);
	}
};

const getAllCategory = () => {
	try {
		return new Promise(async (resolve, reject) => {
			const allCate = await category.find({});
			resolve({
				status: " all categories",
				message: "All categories in shop",
				data: allCate,
			});
		});
	} catch (e) {
		reject(e);
	}
};
