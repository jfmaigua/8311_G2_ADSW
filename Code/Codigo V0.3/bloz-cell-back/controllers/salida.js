const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handleErrors");
const { salidaModel } = require("../models");

/**
 * Obtener lista de la base de datos
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    const data = await salidaModel.find({});
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
    const data = await salidaModel.findOne({
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
    const data = await salidaModel.create(body);
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
    let updateSalida = {
      idProducto: req.body.idProducto,
      nombreProducto: req.body.nombreProducto,
      nombreVendedor: req.body.nombreVendedor,
      tipoOferta: req.body.tipoOferta,
      fecha: req.body.fecha,
      precio: req.body.precio,
      cantidad: req.body.cantidad,
      total: req.body.precio*req.body.cantidad,
    };

    const data = await salidaModel.findOneAndUpdate(
      { idProducto: req.params.idProducto },
      updateSalida
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
    const data = await salidaModel.deleteOne({
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
  const data = await salidaModel.delete({ _id: id });
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
