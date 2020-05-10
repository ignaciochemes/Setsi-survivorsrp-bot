const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    name: "discord",
    aliases: ["dis"],
    category: "informacions",
    description: "Retorna informacion del Discord Server",
    usage: "-discord",
    run: async(bot, message, args) => {
        let sicon = message.guild.iconURL;
        let discordinfo = new Discord.MessageEmbed()
            .setTitle("Hola, soy Setsi! Un bot desarrollado por SurvivorsRP")
            .setDescription("Aqui te traigo la informacion del servidor que me pediste...")
            .setColor("#15f153")
            .setFooter("Desarrollado por SurvivorsRP")
            .setThumbnail('https://i.imgur.com/mnSJzVk.jpg')
            .addField("Nombre del servidor", message.guild.name)
            .addField("Creador", message.guild.owner.user.tag)
            .addField("Creado El", message.guild.createdAt.toUTCString())
            .addField("Region", message.guild.region.toUpperCase())
            .addField("Miembros totales", `${ message.guild.memberCount } Muembros totales\n${ message.guild.members.filter(m => !m.user.bot).size }Cache de usuarios\n${ message.guild.members.filter(m => m.user.bot).size }Cache de bots `)
            .addField("Canales de voz", message.guild.channels.filter(channel => channel.type === 'voice').size)
            .addField("Canales de Texto", message.guild.channels.filter(channel => channel.type === 'text').size)
            .addField("Emojis del servidor", guildEmojis)
        message.channel.send(discordinfo);
    }
}