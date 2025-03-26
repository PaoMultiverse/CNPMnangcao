const mongoose = require("mongoose");

class ModelFactory {
  static createModel(name, schemaDefinition) {
    const schema = new mongoose.Schema(schemaDefinition, { timestamps: true });
    return mongoose.model(name, schema);
  }
}

module.exports = ModelFactory;
