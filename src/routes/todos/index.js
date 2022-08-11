const { nuevaTarea, listaTareas, listaAcerrar } = require("../../controllers/todos");

const nuevaAct = async (msg, palabra) => {
  let nombre_tarea = msg.text.substring(palabra.length + 1 );
  let rs = await nuevaTarea(msg, nombre_tarea);
  return rs;
};

const listaActs = async (msg, palabra) => {
  let filtro;
  switch (palabra){
    case 'pendientes':
      filtro = { estado:'Pendiente'};
      break;
    case 'cumplidos':
      filtro = {estado: 'Cumplida'}
      break;
    default:
      filtro = {};
      break;
  };
  let rs = await listaTareas(msg, filtro);
  return rs;
};

const listaPend = async (msg, palabra) => {

  let rs = await listaAcerrar(msg);
  return rs;
};


module.exports= { nuevaAct, listaActs, listaPend };