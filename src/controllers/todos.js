const { translateAliases } = require('../models/tareas');
const tareas = require('../models/tareas');

const nuevaTarea = async(msg, nombre_tarea) => {
    const data = {
        titulo : nombre_tarea,
        fechas:{
            inicio: Date.now()
        },
        estado: 'Pendiente'
    }
    let tarea = new tareas(data);
    const rsData = await tarea.save().then((data)=>{return data}).catch((err)=>{console.log(err)});
    console.log(rsData._id);
    return { 
        img: 'assets/flash_delivery.png',
        text: null, 
        opts: {
            caption: "Tarea Creada"
          }
    };
}

const listaTareas = async(msg, filtro={}) => {

    const cursor = tareas.find(filtro).cursor();

    let text = 'Esto es lo que tenes '+ filtro.estado +': \n';
    for (let tarea = await cursor.next(); tarea != null; tarea = await cursor.next()) {
        text += ' - ' + tarea.titulo + '\n'
    }

    return { 
        img: null,
        text: text, 
        opts: { }
    };
}

module.exports = {nuevaTarea, listaTareas};