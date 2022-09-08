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

const client = new Client({
    authStrategy: new LocalAuth()
  });

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on("message", async(message) => {
    //Obteniendo numero del usuario
    const usuario = await message.getContact()
    const numero = usuario.number
    //Se hace una query para ver si esta registrado ( para guardar info y eso )
    con.query("SELECT * FROM ProyectosASH.CuentasGITEI WHERE Numero='"+numero+"'",(a,b)=>{
        //Primero verificamos si el usuario tiene un estado pendiente
        if (Estado[numero]){
            const {run} = require("./Estados/"+Estado[numero][0])
            run(message,usuario,Estado[numero])
            return true
        }
        
        //
        if (b.length ==0){
            
            message.reply("😕 Parece que no estas registrad@, me regalas tu nombre: ")
            Estado[numero]=["registro.nombre"]
            return true
        }
        if (fs.existsSync("./Comandos/"+message.body.toLowerCase()+".js")){
            const {run} = require("./Comandos/"+message.body.toLowerCase())
            run(message,usuario,Estado[numero])
            return true
        }else{
            message.reply("😀 Ese no es un comando valido, usa 'ayuda' para ver que puedes hacer.")
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
}
function registrar(numero,nombre){
    con.query("INSERT INTO ProyectosASH.CuentasGITEI (Nombre, Numero, Info) VALUES ('"+nombre+"', '"+numero+"', '');")
}
module.exports ={
    changeState,
    registrar,
    client
}
