const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, Buttons, List } = require('whatsapp-web.js');
const fs = require("fs")
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "5.249.165.176",
    user: "CVR",
    password: "DesarrolloCvrWeb2022."
});
var Estado = {}

let data = {}



const client = new Client({
    // authStrategy: new LocalAuth(), // Enable session storage
    // puppeteer: {
    //     headless: true,
    //     args: ['--no-sandbox',
    //         '--disable-setuid-sandbox']
    // }
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on("message", async(message) => {
    //Obteniendo informacion del usuario
    const usuario = await message.getContact()
    const numero = usuario.number
    //Creando sesion si no existe
    if (!data[usuario]){
        data[usuario]={
            ["UltimoMensaje"]: new Date(1999,1)
            
        }
    }
    //Calculamos hace cuanto no escribe el usuario en minutos
    const tiempoTranscurrido = (Math.abs(new Date() - data[usuario]["UltimoMensaje"] ))/(1000*60)
    //Guardamos el nuevo "ultimo tiempo"
    data[usuario]["UltimoMensaje"]= new Date()

    //Se hace una query para ver si esta registrado ( para guardar info y eso )
    con.query("SELECT * FROM ProyectosASH.CuentasGITEI WHERE Numero='"+numero+"'",(a,b)=>{
        console.log(tiempoTranscurrido)
        if (tiempoTranscurrido >= 1 || message.body.toLowerCase() === "reset"){
            message.reply("¿Buenos dias qué vamos a estudiar hoy ?")
            Estado[numero]=["buscartemas"]
            return true
        }
        // Verificamos si el usuario tiene un estado pendiente
        if (Estado[numero]){
            const {run} = require("./Estados/"+Estado[numero][0])
            run(message,usuario,Estado[numero])
            return true
        }
        
        if (b.length ==0){
            message.reply("😕 Parece que no estas registrad@, me regalas tu nombre:")
            Estado[numero]=["registro.nombre"]
            return true
        }
    })
});


client.on('ready', () => {
    console.log('Conexion con Whatsapp realizada correctamente 😀!');
    
});
client.initialize();

function changeState(data,numero,index){
    if (index){
        if (!Estado[numero]){
            Estado[numero]={}
        }
        Estado[numero][index]=data
        
    }
    else{
        Estado[numero] = data
    }
    console.log("Estado: " + JSON.stringify(Estado, null, 4))
}
function registrar(numero,nombre){
    con.query("INSERT INTO ProyectosASH.CuentasGITEI (Nombre, Numero, Info) VALUES ('"+nombre+"', '"+numero+"', '');")
}
module.exports ={
    changeState,
    registrar,
    client
}
