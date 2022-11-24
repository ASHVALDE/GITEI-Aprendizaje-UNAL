const index = require("../app.js")

module.exports = {
    run: async (message, usuario, data) => {
        index.client.sendMessage(message.from, "Estudiando un problema en específico")
    }
}