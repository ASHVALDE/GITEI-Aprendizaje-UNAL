const index = require("../index.js")
const { MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');
const { join } = require('path')
const isDirectory = source => lstatSync(source).isDirectory()
const getDirectories  = source =>
readdirSync(source).map(name => join(source, name)).filter(isDirectory)
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
module.exports = {
    run: async (message, usuario, data) => {
        switch (message.body.toLowerCase()) {
            case "1": 
                index.client.sendMessage(message.from,"📚 Se llama orden de una ecuacion diferencial al orden de la mayor derivada que aparezca en una ecuacion\n\nEjemplo:")
                index.client.sendMessage(message.from,MessageMedia.fromFilePath('./Media/ED_Orden_Ejemplo.png'))
                await new Promise(resolve => setTimeout(resolve, 1000));
                index.client.sendMessage(message.from,"1️⃣). Seria una Ecuacion Diferencial de segundo orden ya que en la ecuacion la mayor derivada encontrada es Y'' o Y derivada dos veces.")
                index.client.sendMessage(message.from,"2️⃣). Seria una Ecuacion Diferencial de primer orden ya que en la ecuacion la mayor derivada encontrada es Y' o Y derivada.")
                index.client.sendMessage(message.from,"3️⃣). Seria una Ecuacion Diferencial de tercer orden, esta cambia a notacion de leibnitz.")
                message.reply("😄 ¿ Que deseas hacer ?\n1).Aprender del tema\n2).Ejercicios de practica\n3).Volver")

                break;
            case "2":
                const directoriesInDIrectory = fs.readdirSync("./Ejercicios/ED.orden", { withFileTypes: true })
                .filter((item) => item.isDirectory())
                .map((item) => item.name);
                const n = getRandomInt((directoriesInDIrectory.length))
                var obj = JSON.parse(fs.readFileSync('./Ejercicios/ED.orden/'+n+"/datos.json", 'utf8'));
                console.log(obj.Enunciado)
                index.client.sendMessage(message.from,obj.Enunciado)
                index.client.sendMessage(message.from,MessageMedia.fromFilePath("./Ejercicios/ED.orden/"+n+"/imagen.png"))
                let respuestas = ""
                obj.Opciones.forEach((v,i)=>{
                    respuestas+=(i+1)+"). "+ v+"\n"
                })
                await new Promise(resolve => setTimeout(resolve, 1000));
                index.client.sendMessage(message.from,respuestas)
                index.changeState(["estudiar.pregunta.respuesta",obj.OpcionCorrecta,obj.Explicacion],usuario.number)
                break;
            default:
                return false
                break;
        }
    }
}