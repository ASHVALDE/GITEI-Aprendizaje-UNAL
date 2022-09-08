const index = require("../GITEI.js")
module.exports = {
    run: async (message, usuario, data) => {
        let temas = {
            ["ED"]:["Volver","Orden","Linearidad"]
        }
        switch (message.body.toLowerCase()) {
            case "1":
                message.reply("🐒 de momento solo Ecuaciones diferenciales")
                break;
            case "2":
                message.reply("🐒 de momento solo Ecuaciones diferenciales")
                break;
            case "3":
                message.reply("🐒 de momento solo Ecuaciones diferenciales")
                break;
            case "4":
                let mensaje = "🤓 ¿ Que deseas estudiar ?\n"
                temas["ED"].forEach((v,i)=>{
                    mensaje+=(i+1)+"). "+ v+"\n"
                })
                message.reply(mensaje)
                index.changeState(["estudiar.ED"],usuario.number)
                break;
            case "5":
                message.reply("🐒 de momento solo Ecuaciones diferenciales")
                break;
            case "6":
                    message.reply("🔰 Volviendo al menu principal")
                    index.changeState(null,usuario.number)
                    break;
            default:
                break;
        }
    }
}