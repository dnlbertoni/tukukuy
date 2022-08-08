const { menuIdx } = require("./menu")
const { nuevaAct, listaActs } = require('./todos')

const route = async(msg)=>{
    let rs;
    let pal = msg.text.toLowerCase().split(' ')[0];
    //console.log(pal);
    switch(pal){
        case 'menu':
        case '/menu':
            rs = menuIdx(msg);
            break;
        case 'nueva':
        case '/nueva':
            rs = await nuevaAct(msg, pal).catch((err)=> {console.log(err)});
            break;
        case 'pendientes':
        case '/pendientes':
            rs = await listaActs(msg, pal).catch((err)=> {console.log(err)});
            break;            
        case 'cerrar':
        case '/cerrar':
            rs = await listaActs(msg, pal).catch((err)=> {console.log(err)});
            break;       
        case 'ver':
        case '/ver':
            rs = await verAct(msg).catch((err)=> {console.log(err)});
            break;                  
        default:
            rs = null;
            break;
    }
    return rs;
}

module.exports = route;