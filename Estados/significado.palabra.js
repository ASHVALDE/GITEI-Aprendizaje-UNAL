const index = require("../GITEI.js")
const raejs = require('@jodacame/raejs');
 

module.exports = {
    run: async (message, usuario, data) => {
        const response = await raejs.search(message.body);
        if(response.error){
            return message.reply("😕 no pude encontrar esta palabra")
        }
        message.reply(response)
    }
}