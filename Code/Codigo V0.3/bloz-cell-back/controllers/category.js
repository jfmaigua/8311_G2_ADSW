const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handleErrors");
const { categoryModel } = require("../models");

/**
 * Obtener lista de la base de datos
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    const data = await categoryModel.find({});
    res.send({ data });
  } catch (error) {
    handleHttpError(res, error);
  }
};

/**
 * Obtener detalle por ID
 * @param {*} req
 * @param {*} res
 */
const getItemByID = async (req, res) => {
  try {
    const data = await categoryModel.findById(req.params.id);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, error);
  }
};

/*
const getItemByName = async (req, res) => {
  try {
    const data = await categoryModel.findOne({ name: req.params.name });
    res.send({ data });
  } catch (error) {
    handleHttpError(res, error);
  }
};
*/

/**
 * Crear registro
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    const data = await categoryModel.create(body);
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
    let updatedCategory = {
      idCategoria: req.body.idCategoria,
      nombre: req.body.nombre,
    };

    const data = await categoryModel.findOneAndUpdate(
      { _id: req.params.id },
      updatedCategory
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
    const data = await categoryModel.deleteOne({ _id: req.params.id });
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
  const data = await categoryModel.delete({ _id: id });
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
