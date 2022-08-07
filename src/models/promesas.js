const mongoose = require("mongoose");

const promesaSchema = mongoose.Schema({
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
        type: String
    }
}
);

module.exports = mongoose.model('promesas', promesaSchema);