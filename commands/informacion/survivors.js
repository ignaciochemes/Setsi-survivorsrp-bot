const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
	name: "survivors",
    aliases: ["srv"],
    category: "informacion",
    description: "Retorna informacion en tiempo real de SurvivorsRP",
    usage: "-survivors",
	run: async (bot, message, args) => {
		let sicon = message.guild.iconURL;
		let serverembed = new Discord.MessageEmbed()
		.setTitle("Hola, soy Setsi! Un bot desarrollado por SurvivorsRP")
		.setDescription("Aqui te traigo la informacion del servidor que me pediste...")
		.setColor("#15f153")
		.setFooter("Desarrollado por SurvivorsRP")
		.setThumbnail('https://i.imgur.com/mnSJzVk.jpg')
		.addField("Nombre del servidor", message.guild.name)
		.addField("Nombre DayZ Server",`\nESP-Survivors-rp.com \`RolePlay\`|\`Whitelisted\`|`)
		.addField("Informacion GameTracker", `\nhttps://www.gametracker.com/server_info/51.91.183.212:2302/`)
		.addField("Informacion TrackyServer", `\nhttps://www.trackyserver.com/server/survivorsrp-esp-302444`)
		.addField("Miembros totales", message.guild.memberCount);

		message.channel.send(serverembed);
	}
}