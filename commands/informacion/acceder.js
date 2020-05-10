const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
	name: "accede",
    aliases: ["acc"],
    category: "informacion",
    description: "Como acceder al servidor",
    usage: "-accede",
	run: async (bot, message, args) => {
		let sicon = message.guild.iconURL;
		let accede = new Discord.MessageEmbed()
		.setTitle("Hola, soy Setsi! Un bot desarrollado por SurvivorsRP")
		.setDescription("Aqui te traigo la informacion del servidor que me pediste...", `\nQuiero mostrarte como \`ingresar al servidor\``)
		.setColor("RANDOM")
		.setFooter("Desarrollado por SurvivorsRP")
		.setThumbnail('https://i.imgur.com/mnSJzVk.jpg')
		.addField("Normativas y Whitelist", `\nComo primer paso debemos registrarnos en el foro, ingresan al apartado de normativas y las leen por completo. Recuerden que cualquier salto de normativa es motivo de sancion o incluso expulsion del servidor.\nComo\`segundo paso\` debemos realizar la Whitelist, en donde se realizaran unas preguntas para saber si comprendieron la normativa.\n \`Links Aqui:\`\nNORMATIVAS IN-GAME: https://survivors-rp.com/foro/viewforum.php?f=14&sid=db5b0886c2c88eedfb6939b151338403\nNORMATIVAS DEL FORO: https://survivors-rp.com/foro/viewforum.php?f=13&sid=db5b0886c2c88eedfb6939b151338403`)
		.addField("Presentacion del personaje", `\nUna vez finalizado el primer paso tenemos que \`Hacer la historia de nuestro peronaje\`a traves del siguiente link: https://survivors-rp.com/foro/viewforum.php?f=30&sid=db5b0886c2c88eedfb6939b151338403`)
		.addField("Finalizado a la espera de respuesta", `\nEn cuanto un administrador \`pueda y tenga tiempo\` se revisa la presentacion y se evalua. En caso de estar o no apto se les notificara \`por el mismo hilo\``)
		.addField("Miembros totales", message.guild.memberCount);

		message.channel.send(accede);
	}
}