const index = require("../GITEI.js")
module.exports = {
    run: async (message, usuario, data) => {
        switch (message.body.toLowerCase()) {
            case "1":
                index.changeState(null,usuario.number)
                message.reply("🔰 Volviendo al menu principal")
                break;
            case "2":
                index.changeState(["estudiar.ED.orden"],usuario.number)
                break;
            case "3":
                index.changeState(["estudiar.ED.linealidad"],usuario.number)
                break;
            default:
                return false
                break;
        }
        message.reply("😄 ¿ Que deseas hacer ?\n1).Aprender del tema\n2).Ejercicios de practica\n3).Volver")
    }
}