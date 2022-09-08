const index = require("../index.js")

module.exports = {
    run: async (message, usuario, data) => {
        switch (message.body.toLowerCase()) {
            case "s":
            case "si":  
                message.reply("gracias por registrarte, usa 'ayuda' para ver que puedes hacer.")
                index.registrar(usuario.number,data[1])
                index.changeState(null,usuario.number)
                break;
            case "n":
            case "no":
                message.reply("😕 Parece que no estas registrad@, me regalas tu nombre: ")
                index.changeState(["registro.nombre"],usuario.number)

                break;
            default:
                break;
        }
    }
}