const index = require("../app.js")
const factorizacionTags = ["factorizacion", "factor comun", "polinomios", "polinomio"]
const temas_dict = { "factorizacion": factorizacionTags, }

module.exports = {
    run: async (message, usuario, data) => {
        let mensaje = message.body.toLowerCase()
        let match_found = false
        for (const [theme, tags] of Object.entries(temas_dict)) {
            tags.forEach(tag => {
                if (mensaje.includes(tag)) {
                    index.changeState(["estudiar.tipo", theme], usuario.number);
                    match_found = true
                    message.reply("Tienes un problema en específico o te gustaría estudiar en general?")
                }
            });
        }
        if (match_found) return true

        let msg = "Te puedo ayudar con alguno de estos:\n"
        Object.keys(temas_dict).forEach(theme=>{
            msg += "  *- " + theme + "*\n"
        })
        message.reply(msg)
        index.client.sendMessage(message.from, "¿Qué te gustaría estudiar?")
        return true
    },
    temas_dict
}