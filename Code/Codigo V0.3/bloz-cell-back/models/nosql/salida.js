const mongoose = require("mongoose");

const salidaScheme = new mongoose.Schema(
  {
    idProducto: {
      type: String,
    },
    nombreProducto: {
      type: String,
    },
    nombreVendedor: {
      type: String,
    },
    tipoOferta: {
      type: String,
    },
    fecha: {
      type: Date,
    },
    precio: {
      type: Number,
    },
    cantidad: {
      type: Number,
    },
    total: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("salida", salidaScheme);
