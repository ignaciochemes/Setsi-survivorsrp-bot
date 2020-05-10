const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "help",
    aliases: ["h"],
    category: "informacion",
    description: "Retorna todos los comandos, especificando cada uno",
    usage: "-help",
    run: async(client, message, args) => {
        if (args[0]) {
            return getCMD(client, message, args[0]);
        } else {
            return getAll(client, message);
        }
    }
}

function getAll(client, message) {
    const embed = new MessageEmbed()
        .setTitle(`Lista de Comandos\nPrefijo \`-\`\nEj: \`-usuario\``)
		.setColor("RANDOM")
		.setDescription(`Escribe el comando -help + <comando> ej: -help ping para ver las funciones`)
		.setThumbnail('https://i.imgur.com/mnSJzVk.jpg');
		

    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `- \`${cmd.name}\``)
            .join("\n");
    }

    const info = client.categories
        .map(cat => stripIndents `**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
        .reduce((string, category) => string + "\n" + category);

    return message.channel.send(embed.setDescription(info));
}

function getCMD(client, message, input) {
    const embed = new MessageEmbed()

    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));

    let info = `No hay informacion sobre el comando **${input.toLowerCase()}**`;

    if (!cmd) {
        return message.channel.send(embed.setColor("RED").setDescription(info));
    }

    if (cmd.name) info = `**Nombre del comando**: ${cmd.name}`;
    if (cmd.aliases) info += `\n**Alias**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
    if (cmd.description) info += `\n**Descripcion**: ${cmd.description}`;
    if (cmd.usage) {
        info += `\n**Como usarlo**: ${cmd.usage}`;
        embed.setFooter(`Syntax: <-> = requerido, [] = opcional`);
    }

    return message.channel.send(embed.setColor("GREEN").setDescription(info));
}