const config = require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const TOKEN = process.env.HTTP_API_TELEGRAM || 'NOTOKEN';

const request = require('request');
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
            { text:"hola"},
            { text:"veni"},
          ]
        }
      };
      bot.sendMessage(msg.chat.id, 'Me amas?', opts);
  });

// Matches /photo
bot.onText(/veni/, function onPhotoText(msg) {
  // From file path
  const photo = `assets/flash.png`;
  bot.sendPhoto(msg.chat.id, photo, {
    caption: "ya voy mi amor!"
  });
});

// Matches /photo
bot.onText(/hola/, (msg)=> {
    bot.sendMessage(msg.chat.id, "holis, " + msg.chat.first_name);
    console.log(msg.chat)
  });
  
bot.onText(/donde/, (msg)=> {
    bot.sendLocation(msg.chat.id,-31.320393,-58.021171);
    console.log(msg.chat)
});



// Matches /audio
bot.onText(/\/audio/, function onAudioText(msg) {
  // From HTTP request
  const url = 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Example.ogg';
  const audio = request(url);
  bot.sendAudio(msg.chat.id, audio);
});


// Matches /love
bot.onText(/\/amor/, function onLoveText(msg) {
  const opts = {
    reply_to_message_id: msg.message_id,
    reply_markup: JSON.stringify({
      keyboard: [
        ['Shim,  ❤'],
        ['Nop']
      ]
    })
  };
  bot.sendMessage(msg.chat.id, 'Me amas?', opts);
});


// Matches /echo [whatever]
bot.onText(/\/echo (.+)/, function onEchoText(msg, match) {
  const resp = match[1];
  bot.sendMessage(msg.chat.id, resp);
});


// Matches /editable
bot.onText(/\/editable/, function onEditableText(msg) {
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Edit Text',
            // we shall check for this value when we listen
            // for "callback_query"
            callback_data: 'edit'
          }
        ]
      ]
    }
  };
  bot.sendMessage(msg.from.id, 'Original Text', opts);
});


// Handle callback queries
bot.on('callback_query', function onCallbackQuery(callbackQuery) {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  const opts = {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
  };
  let text;

  if (action === 'edit') {
    text = 'Edited Text';
  }

  bot.editMessageText(text, opts);
});

bot.onText(/^qr/, function(msg) {
  console.log(msg);
  var userId = msg.from.id;
  var data = msg.text.substring(3).trim();
  var imageqr = "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" + data;
bot.sendMessage(msg.chat.id, "[✏️](" + imageqr + ")Qr code de: " + data,{parse_mode : "Markdown"});
});