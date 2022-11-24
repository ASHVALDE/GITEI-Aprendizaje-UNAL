const index = require("../app.js")
module.exports = {
    run: async (message, usuario, data) => {
        message.reply("🤔 estas seguro que tu nombre es: "+message.body+"\nEscribe 'S' para confirmar.\nEscribe 'N' para escribir tu nombre nuevamente.")
        index.changeState(["registro.confirmar",message.body],usuario.number)
    }
}