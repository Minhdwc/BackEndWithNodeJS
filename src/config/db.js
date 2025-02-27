const mongoose = require('mongoose');

class MongoDB {
    constructor() {
        this.connection = null; // Tránh kết nối nhiều lần
    }

    connect = async () => {
        if (this.connection) {
            console.log("Already connected to MongoDB.");
            return this.connection;
        }

        try {
            this.connection = await mongoose.connect(process.env.MONGO_URL);

            console.log("MongoDB connected successfully.");
            return this.connection;
        } catch (error) {
            console.error(`Error connecting to MongoDB: ${error.message}`);
        }
    };
}

module.exports = new MongoDB(); // Xuất thể hiện của class để dùng chung
