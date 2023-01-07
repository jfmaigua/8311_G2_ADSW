const mongoose = require("mongoose");
const categoryScheme = new mongoose.Schema(
  {
    idCategoria: {
      type: String,
    },
    nombre: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("category", categoryScheme);
