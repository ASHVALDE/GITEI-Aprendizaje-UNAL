const index = require("../app.js")

module.exports = {
    run: async (message, usuario, data) => {
        index.client.sendMessage(message.from, "¿Que expresion quieres factorizar?")
        index.changeState(["estudiar.tipo.especifico.factorizacion2"],usuario.number)
    }
}