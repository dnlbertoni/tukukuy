const config = require('dotenv').config();

const request = require('request');

const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const TOKEN = process.env.HTTP_API_TELEGRAM || 'NOTOKEN';

const db = require('./services/database');
const { callbacksIdx } = require('./routes/menu/callbacks');
const route = require('./routes');

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

bot.onText(/./,  async (msg)=> {
  let rs = await route(msg);
  if ( rs != null ){
    if(rs.img != null ){
      bot.sendPhoto(msg.chat.id, rs.img, rs.opts);
    }else{
      bot.sendMessage(msg.chat.id, rs.text , rs.opts);
    }
  }
});


// Handle callback queries
bot.on('callback_query', async(callbackQuery)=> {
  const msg = callbackQuery.message;
  let rs  = await callbacksIdx(callbackQuery,msg);
  bot.sendMessage(msg.chat.id,rs.text, rs.opts);
});
