const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "decir",
    category: "moderacion",
    description: "Escribe -decir + embed [texto] . -decir embed hola buenas tardes",
    run: async(client, message, args) => {
        if (message.deletable) message.delete();
        if (args.length < 1)
            return message.reply("Nada que decir?").then(m => m.delete(5000));

        const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;

        if (args[0].toLowerCase() === "embed") {
            const embed = new MessageEmbed()
                .setColor(roleColor)
                .setDescription(args.slice(1).join(" "))
                .setAuthor(message.author.username)

            message.channel.send(embed);
        } else {
            message.channel.send(args.join(" "));
        }
    }
}