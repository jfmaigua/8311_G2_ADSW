const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handleErrors");
const { productsModel } = require("../models");

/**
 * Obtener lista de la base de datos
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    const data = await productsModel.find({});
    res.send({ data });
  } catch (error) {
    handleHttpError(res, error);
  }
};

/**
 * Obtener detalle
 * @param {*} req
 * @param {*} res
 */
const getItemByID = async (req, res) => {
  try {
    const data = await productsModel.findOne({
      idProducto: req.params.idProducto,
    });
    res.send({ data });
  } catch (error) {
    handleHttpError(res, error);
  }
};

/**
 * Crear registro
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    const data = await productsModel.create(body);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, e);
  }
};

/**
 * Actualizar registro
 * @param {*} req
 * @param {*} res
 */
const updateItem = async (req, res) => {
  try {
    let updatedProduct = {
      idProducto: req.body.idProducto,
      nombre: req.body.nombre,
      marca: req.body.marca,
      modelo: req.body.modelo,
      precio: req.body.precio,
      caracteristicas: req.body.caracteristicas,
      imagen: req.body.imagen,
      cantidad: req.body.cantidad,
      categoria: req.body.categoria,
    };

    const data = await productsModel.findOneAndUpdate(
      { idProducto: req.params.idProducto },
      updatedProduct
    );
    res.send({ data });
  } catch (e) {
    handleHttpError(res, e);
  }
};

/**
 * Eliminar registro
 * @param {*} req
 * @param {*} res
 */
const deleteItem = async (req, res) => {
  try {
    const data = await productsModel.deleteOne({
      idProducto: req.params.idProducto,
    });
    res.send({ data });
  } catch (e) {
    handleHttpError(res, e);
  }
};

/**
 * Eliminar registro (logico)
 * @param {*} req
 * @param {*} res
 */
const deleteItemLogic = async (req, res) => {
  req = matchedData(req);
  const { id } = req;
  const data = await productsModel.delete({ _id: id });
  res.send({ data });
};

module.exports = {
  getItems,
  getItemByID,
  createItem,
  updateItem,
  deleteItem,
  deleteItemLogic,
};
