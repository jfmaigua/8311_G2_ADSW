const express = require("express");
const router = express.Router();
const {
  getItems,
  getItemByID,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/products");

/**
 * Lista los items
 */
router.get("/", getItems);

/**
 * Obtener detalle de item
 */
router.get("/:idProducto", getItemByID);

/**
 * Crear un registro
 */
router.post("/", createItem);

/**
 * Actualizar un registro
 */
router.put("/:idProducto", updateItem);

/**
 * Eliminar un registro
 */
router.delete("/:idProducto", deleteItem);

module.exports = router;
