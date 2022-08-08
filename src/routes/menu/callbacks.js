const { listaTareas } = require("../../controllers/todos");

const callbacksIdx = async (callbackQuery) =>{
    const action = callbackQuery.data;
    const msg = callbackQuery.message;
    const opts = {
      chat_id: msg.chat.id,
      message_id: msg.message_id,
    };
    var text;
  
    switch (action ){
      case "bm1":
        text = 'holis ' + msg.chat.first_name;
        break;
      case 'bt1':
        text = 'debe escribir: nueva <nombre de la tarea>';
        break;
      case 'bt2':
        let pend = await listaTareas(msg, {estado:'Pendiente'});
        text = pend.text;
        break;             
      case "bm99":
        text = 'ok ya voy';
        break;
      default:
        text = 'Accion no definida aun...';
        break;
    }
    return {text : text , opts: opts};
}

module.exports = {callbacksIdx};