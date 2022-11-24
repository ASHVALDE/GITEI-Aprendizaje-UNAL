const index = require("../app.js")
const casos = require("../caso.js")
module.exports = {
    run: async (message, usuario, data) => {
        let mensaje = "Podrias intentar hacer factor comun a : "
        const FC= casos.identificar(message.body)
        FC.forEach(FCx => {
            mensaje= mensaje+FCx+" "
        });
        index.client.sendMessage(message.from, mensaje)
    
    }
}