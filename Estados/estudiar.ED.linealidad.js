const index = require("../GITEI.js")
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
                index.client.sendMessage(message.from,"📚 Una ecuacion diferencial es lineal cuando cumple los siguientes requisitos:")
                index.client.sendMessage(message.from,"1️⃣). La variable dependiente y sus Y' dY/dX no pueden estar elevadas a otra cosa que no sea 1.")
                index.client.sendMessage(message.from,MessageMedia.fromFilePath('./Media/ED_Linealidad_Ejemplo_1.png'))
                await new Promise(resolve => setTimeout(resolve, 1000));
                index.client.sendMessage(message.from,"2️⃣). Los coeficientes de las derivadas (la funcion que multiplica dY ) no pueden contener Y y deben depender de la variable independiente X")
                index.client.sendMessage(message.from,MessageMedia.fromFilePath('./Media/ED_Linealidad_Ejemplo_2.png'))
                await new Promise(resolve => setTimeout(resolve, 1000));
                index.client.sendMessage(message.from,"3️⃣). La linealidad solo se exige a la variable dependiente (Y) y no importa en la variable independiente (X).")
                index.client.sendMessage(message.from,"4️⃣). La variable dependiente no puede operarse con una funcion trigonometrica,logaritmica y/o Exponencial.")
                index.client.sendMessage(message.from,"👓 Ejemplos de ecuaciones diferenciales no lineales (En rojo el motivo por el que no son lineales).")

                index.client.sendMessage(message.from,MessageMedia.fromFilePath('./Media/ED_Linealidad_Ejemplo_3.png'))
                await new Promise(resolve => setTimeout(resolve, 1000));
                message.reply("😄 ¿ Que deseas hacer ?\n1).Aprender del tema\n2).Ejercicios de practica\n3).Volver")

                break;
            case "2":
                const directoriesInDIrectory = fs.readdirSync("./Ejercicios/ED.linealidad", { withFileTypes: true })
                .filter((item) => item.isDirectory())
                .map((item) => item.name);
                const n = getRandomInt((directoriesInDIrectory.length))
                var obj = JSON.parse(fs.readFileSync('./Ejercicios/ED.linealidad/'+n+"/datos.json", 'utf8'));
                console.log(obj.Enunciado)
                index.client.sendMessage(message.from,obj.Enunciado)
                index.client.sendMessage(message.from,MessageMedia.fromFilePath("./Ejercicios/ED.linealidad/"+n+"/imagen.png"))
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