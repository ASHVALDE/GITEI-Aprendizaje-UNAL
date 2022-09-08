const index = require("../index.js")
const {List, Buttons } = require('whatsapp-web.js');
module.exports = {
    run: async (message, usuario, data) => {
        const materias = ["Matematicas Basicas","Calculo Diferencial","Calculo Integral","Ecuaciones Diferenciales","Variable Compleja","Volver"]
        let mensaje = "🤓 ¿ Que deseas estudiar ?\n"
        materias.forEach((v,i)=>{
            mensaje+=(i+1)+"). "+ v+"\n"
        })
        message.reply(mensaje)
        index.changeState(["estudiar.materia"],usuario.number)

    }
}