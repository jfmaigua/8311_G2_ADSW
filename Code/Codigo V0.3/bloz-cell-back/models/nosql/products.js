const mongoose = require("mongoose");

const productScheme = new mongoose.Schema(
  {
    idProducto: {
      type: String,
    },
    nombre: {
      type: String,
    },
    marca: {
      type: String,
    },
    modelo: {
      type: String,
    },
    precio: {
      type: String,
    },
    caracteristicas: {
      type: String,
    },
    imagen: {
      type: String,
    },
    cantidad: {
      type: Number,
    },
    categoria: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("products", productScheme);
