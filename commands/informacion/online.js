  
const Discord = require("discord.js")


module.exports = {
	name: "online",
    description: "Muestra el tiempo activo del Bot",
    usage: "-online",
	category: "informacion",
    accessableby: "Members",
    aliases: ["un"],
	run: async (client, message, args) => {
		function duration(ms) {
		const sec = Math.floor((ms / 1000) % 60).toString()
		const min = Math.floor((ms / (1000 * 60)) % 60).toString()
		const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
		const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
		return `${days.padStart(1, '0')} dias, ${hrs.padStart(2, '0')} horas, ${min.padStart(2, '0')} minutos, ${sec.padStart(2, '0')} segundos, `
		}

		let uptime = new Discord.MessageEmbed()
            .setTitle(`Estoy en linea hace: ${duration(client.uptime)}`)
            .setColor("RANDOM")
		message.channel.send(uptime);
	}
}