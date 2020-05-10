module.exports = {
    name: "borrar",
    aliases: ["b"],
    category: "moderacion",
    description: "Borra x cantidad de mensajes. -borrar x",
	accessableby: ["Administrators", "Moderators"],
    run: async(client, message, args) => {
        if (message.deletable) {
            message.delete();
        }

        // Member doesn't have permissions
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("No puedes borrar mensajes...").then(m => m.delete(5000));
        }

        // Check if args[0] is a number
        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.reply("Si.... Eso es un numero? Creo que no puedo borrar ningun mensaje de todas formas...").then(m => m.delete(5000));
        }

        // Maybe the bot can't delete messages
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("Perdon, no puedo borrar mensajes....").then(m => m.delete(5000));
        }

        let deleteAmount;

        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        message.channel.bulkDelete(deleteAmount, true)
            .then(deleted => message.channel.send(`Borre \`${deleted.size}\` mensajes.`))
            .catch(err => message.reply(`Algo esta mal... ${err}`));
    }
}