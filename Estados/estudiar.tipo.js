const index = require("../app.js")
const buscartemas = require("./buscartemas.js")
const temas_dict = buscartemas.temas_dict
const problema_tags = ["tengo un problema", "problema", "específico", "problema en específico", "problema específico"]
const estudiar_tags = ["general", "quiero estudiar", "me gustaria estudiar"]
const study_types = { "especifico": problema_tags, "general": estudiar_tags }

// TODO: Normalizar palábras con tildes a sin tildes
// TODO: Probar el clasificador de temas de IBM Watson para chatbots
module.exports = {
    run: async (message, usuario, data) => {
        let match_found = false
        for (const [study_type, tags] of Object.entries(study_types)) {
            tags.forEach(tag => {
                if (message.body.toLowerCase().includes(tag)) {
                    let theme = data[1]
                    let nombre_de_estado = "estudiar.tipo." + study_type + "." + theme
                    index.changeState([nombre_de_estado, theme], usuario.number);

                    const { run } = require("./" + nombre_de_estado)
                    run(message, usuario, [nombre_de_estado, theme])
                    match_found = true
                }
            });
        }
        if (match_found) return true
        index.client.sendMessage(message.from, "Cuando digo 'problema en específico' me refiero a si tienes, " +
            "por ejemplo, una ecuación que te gustaría resolver.")

        index.client.sendMessage(message.from, "Cuando digo que si te gustaría estudiar, yo te propongo un ejercicio "+
                                                "y lo vamos resolviendo juntos.")

        message.reply("Entonces... ¿tienes un problema en específico o te gustaría estudiar?")
        return true
    }
}