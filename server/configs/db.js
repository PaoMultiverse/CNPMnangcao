const mongoose = require("mongoose");

class Database {
  static instance = null;

  constructor() {
    if (!Database.instance) {
      this._connect();
      Database.instance = this;
    }
    return Database.instance;
  }

  async _connect() {
    try {
      this.connection = await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 10000,
      });
      console.log("Connected to MongoDB successfully!");
    } catch (error) {
      console.error("MongoDB connection failed: " + error.message);
      process.exit(1);
    }
  }
}

module.exports = new Database();
