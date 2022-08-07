const config = require('dotenv').config();

const request = require('request');
const promesas = require('./controllers/promesas');

const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const TOKEN = process.env.HTTP_API_TELEGRAM || 'NOTOKEN';


const options = {
  polling: true
};
const bot = new TelegramBot(TOKEN, options);

//bienvenida
bot.on('/start', function(msg){
    
    var chatId = msg.chat.id;
    var chatitle = msg.chat.title;
    
    if (msg.new_chat_members != undefined){
    
        var nameNewMember = msg.new_chat_member.first_name;
    
        bot.sendMessage(chatId, "Hola " + nameNewMember + ", bienvenido al grupo de tareas " + chatitle);
    }
    else if (msg.left_chat_member != undefined){
    
        var nameLeftMember = msg.left_chat_member.first_name;
        
        bot.sendMessage(chatId, nameLeftMember + " abandonó el grupo")
    }
});

// Matches /photo
bot.onText(/menu/, function onPhotoText(msg) {
  const opts = {
    reply_to_message_id: msg.message_id,
    reply_markup: {
      inline_keyboard:[ 
        [
          { text:"hola", callback_data:'bm1'}
        ]
      ]
    }
  };
  bot.sendMessage(msg.chat.id, 'En que puedo ayudarte?', opts);
});

// Handle callback queries
bot.on('callback_query', function onCallbackQuery(callbackQuery) {
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
    case "bm99":
      text = 'ok ya voy';
      break;
    default:
      text = ' ';
      break;
  }
  bot.sendMessage(msg.chat.id,text, opts);
});

// Matches /photo
bot.onText(/^nueva (.+)/, function onPhotoText(msg, match) {
  console.log(match);
  let titulo = match[1];
  var text = promesas.insertData(titulo).then((rtn)=> text = rtn).catch((err)=> console.log(err));

  bot.sendMessage(msg.chat.id, text );
});