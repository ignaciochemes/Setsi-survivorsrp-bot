const { MessageEmbed } = require("discord.js");
const { cyan } = require("../../colours.json");
const { stripIndents } = require("common-tags");
const dateFormat = require("dateformat");
const fetch = require("node-fetch");

module.exports = { 
	name: "steam",
    description: "Retorna informacion de steam",
    usage: "-steam <usuario>",
    category: "informacion",
		run: async (client, message, args) => {
			const token = "YOUR-STEAM-KEY-HERE";
			if(!args[0]) return message.channel.send("Por favor ingresa nombre de cuenta!");
			const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${token}&vanityurl=${args.join(" ")}`;

        fetch(url).then(res => res.json()).then(body => {
            if(body.response.success === 42) return message.channel.send("No puedo encontrar una cuenta con ese nombre!");

                const id = body.response.steamid;
                const summaries = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${token}&steamids=${id}`;
                const bans = `http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${token}&steamids=${id}`;
                const state = ["Offline", "Online", "Busy", "Away", "Snooze", "Looking to trade", "Looking to play"];

        fetch(summaries).then(res => res.json()).then(body => {
            if(!body.response) return message.channel.send("No pude encontrar un perfil de Steam con ese nombre");
            const { personaname, avatarfull, realname, personastate, loccountrycode, profileurl, timecreated } = body.response.players[0];

        fetch(bans).then(res => res.json()).then(body => {
            if(!body.players) return message.channel.send("No pude encontrar un perfil de Steam con ese nombre");
            const { NumberOfVACBans, NumberOfGameBans} = body.players[0];

            const steam = new MessageEmbed()
                .setColor(cyan)
                .setAuthor(`Servicios de Steam | ${personaname}`, avatarfull)
                .setThumbnail(avatarfull)
                .setDescription(stripIndents`**Nombre:** ${realname || "Desconocido"}
                **Estado:** ${state[personastate]}
                **Pais:** :flag_${loccountrycode ? loccountrycode.toLowerCase() : "white"}:
                **Cuenta Creada:** ${dateFormat(timecreated * 1000, "d/mm/yyyy (h:MM:ss TT)")}
                **Ban:** Vac: ${NumberOfVACBans}, Game: ${NumberOfGameBans}
                **Link:** [Link del Perfil](${profileurl})`)
                .setTimestamp();

                message.channel.send(steam)
            })
        })
    })
  }
}