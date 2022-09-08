const index = require("../index.js")
const {List, Buttons } = require('whatsapp-web.js');
const comandos = {
    ["🤗 Ayuda"]:"Muestra este menu!",
    ["🤓 Estudiar"]:"Estudia sobre los temas que necesites, realiza ejercicios en tiempo real y resuelve ejercicios tipo parcial para profundizar conocimientos",
    ["📊 Estadisticas"]:"Mira tu progreso de aprendizaje y revisa que temas no has estudiado."
}
module.exports = {
    run: async (message, usuario, data) => {
        let mensaje ="😁 Hola mi nombre es pancracho tu mejor compañero en el proceso de aprendizaje, mis comandos son los siguientes:\n\n"
        Object.keys(comandos).forEach(v=>{
            mensaje += v +": "+comandos[v]+"\n\n"
        })
        message.reply(mensaje)
        
    }
}