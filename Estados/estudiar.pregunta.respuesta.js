const index = require("../index.js")
function responder(correcto,Explicacion,ID){
    if (correcto){
        index.client.sendMessage(ID,"🟢 Respuesta correcta: +1 Punto en este tema")
    }else{
        index.client.sendMessage(ID,"🔴 Respuesta incorrecta: -1 Punto en este tema")
    }
    index.client.sendMessage(ID,Explicacion)
}
module.exports = {
    run: async (message, usuario, data) => {
        console.log(data)
        switch (message.body.toLowerCase()) {
            case "1":
            
                responder(data[1]=="1",data[2],message.from)
                index.changeState(null,usuario.number)
                break;
            case "2":
                responder(data[1]=="2",data[2],message.from)
                index.changeState(null,usuario.number)
                break;
            case "3":
                responder(data[1]=="3",data[2],message.from)
                index.changeState(null,usuario.number)
                break;
            case "4":
                responder(data[1]=="4",data[2],message.from)
                index.changeState(null,usuario.number)
                break;
            default:
                return false
                break;
        }
        message.reply("🔰 Volviendo al menu principal")
    }
}