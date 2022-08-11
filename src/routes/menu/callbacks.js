const { listaTareas, listaAcerrar } = require("../../controllers/todos");

const callbacksIdx = async (callbackQuery) =>{
    const action = callbackQuery.data;
    const msg = callbackQuery.message;
    let opts = {
      chat_id: msg.chat.id,
      message_id: msg.message_id,
    };
    var text;
    console.log(callbackQuery);
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
      case 'bt3':
        let close = await listaAcerrar(msg);
        text = close.text;
        opts = close.opts;
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