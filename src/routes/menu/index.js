const menuIdx = async (msg) => {
    const opts = {
        reply_to_message_id: msg.message_id,
        reply_markup: {
          inline_keyboard:[ 
            [
              { text:"hola", callback_data:'bm1'},
              { text:"nueva", callback_data:'bt1'},
              { text:"pendientes", callback_data:'bt2'},             
              { text:"cerrar", callback_data:'bt3'}              
            ]
          ]
        }
      };
    return  {text : 'En que puedo ayudarte?' , opts: opts};
};


module.exports= {menuIdx};