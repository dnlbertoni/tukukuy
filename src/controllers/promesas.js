const mongoose = require('mongoose');
const model = require('../models/promesas');

const parseId = (id) => {
    return mongoose.Types.ObjectId(id)
}
/**
 * Obtener DATA de USUARIOS
 */

exports.getData = (req, res) => {
    model.paginate({}, options, (err, docs) => {
        res.send({
            items: docs
        })
    })
}

/**
 * Obtener DATA de USUARIOS
 */

exports.getSingle = (req, res) => {
    model.findOne({ _id: parseId(req.params.id) },
        (err, docs) => {
            res.send({
                items: docs
            })
        })
}

/**
 * Obtener DATA de USUARIOS
 */

exports.updateSingle = (req, res) => {
    const { id } = req.params
    const body = req.body
    model.updateOne(
        { _id: parseId(id) },
        body,
        (err, docs) => {
            res.send({
                items: docs
            })
        })
}


/**
 * Insertar DATA de USUARIOS
 */
exports.insertData = async (titulo) => {
    let data = {
        id:1,
        titulo: titulo,
        fechas:{
            inicio: null,
            final: null
        },
        estado: "Pendiente"
    }
    const promesa = model(data);
    promesa.save().then((data)=> console.log(data)).catch((err)=> console.log(err));
    console.log(promesa.ObjectId());
    return promesa.ObjectId();
}

/**
 * Obtener DATA de USUARIOS
 */

exports.deleteSingle = (req, res) => {
    const { id } = req.params
    model.deleteOne(
        { _id: parseId(id) },
        (err, docs) => {
            res.send({
                items: docs
            })
        })
}