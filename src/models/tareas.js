const mongoose = require("mongoose");

const tareasSchema = mongoose.Schema({
    titulo:{
        type: String, 
        unique: false,
        required: true
    },
    fechas: {
        inicio: {
            type: Date, 
            unique: false,
        },
        fin: {
            type: Date, 
            unique: false,
            required: false
        },
    }, 
    estado: {
        type: String, 
        required: true
    }
}
);

module.exports = mongoose.model('tareas', tareasSchema);