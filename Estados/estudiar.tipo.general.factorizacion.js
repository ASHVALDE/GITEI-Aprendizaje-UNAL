const index = require("../app.js")

module.exports = {
    run: async (message, usuario, data) => {
        index.client.sendMessage(message.from, "Estudiando en general")
        let theme = data[1]
        console.log(data)
        return true
    }
}