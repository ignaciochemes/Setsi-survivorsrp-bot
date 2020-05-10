const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { getMember, formatDate } = require("../../functions.js");

module.exports = {
    name: "usuario",
    aliases: ["u"],
    category: "informacion",
	description: "Devuelve informacion de usuario",
    usage: "-usuario | -usuario <nombre de usuario>",
    run: (client, message, args) => {
        const member = getMember(message, args.join(" "));

        // Member variables
        const joined = formatDate(member.joinedAt);
        const roles = member.roles.cache
            .filter(r => r.id !== message.guild.id)
            .map(r => r).join(", ") || 'ninguno';

        // User variables
        const created = formatDate(member.user.createdAt);

        const embed = new MessageEmbed()
            .setFooter(member.displayName, member.user.displayAvatarURL)
            .setThumbnail('https://i.imgur.com/mnSJzVk.jpg')
            .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)

        .addField('Informacion:', stripIndents `**- Nombre:** ${member.displayName}
            **- Ingreso en:** ${joined}
            **- Roles:** ${roles}`, true)

        .addField('Informacion de usuario:', stripIndents `**- ID:** ${member.user.id}
            **- Username**: ${member.user.username}
            **- Tag**: ${member.user.tag}
            **- Se creo**: ${created}`, true)

        .setTimestamp()

        if (member.user.presence.game)
            embed.addField('Actualmente jugando', stripIndents `** nombre:** ${member.user.presence.game.name}`);

        message.channel.send(embed);
    }
}