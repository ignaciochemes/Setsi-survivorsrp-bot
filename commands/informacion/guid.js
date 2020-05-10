const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { createHash } = require("crypto");
//const { getMember, formatDate } = require("../../functions.js");
//const steamId = 76561198120289934n;
let bytes = [];
module.exports = {
    usage: "-guid",
    name: "guid",
    category: "informacion",
    description: "Retorna la peticion de Hash (Steam Id 64 a MD5 hash GUID)",
    run: async(client, message, args) => {
        let tmp = message.content.split(" ");
        let siEnviarEmbed = new Discord.MessageEmbed();
        try { 
            for (let i = 0; i < 8; i++) {
                bytes.push(Number((BigInt(tmp[1]) >> (8n * BigInt(i))) & 0xFFn));
            }
            let guid = createHash('md5').update(Buffer.from([0x42, 0x45, ...bytes])).digest('hex');
            bytes = [];
            
            siEnviarEmbed.setTitle(`Tu encriptacion GUID es`)
                .setColor("RANDOM")
                .setDescription(`${guid}`)
                .setThumbnail('https://i.imgur.com/mnSJzVk.jpg');
        } catch(e)
        {
             console.log(`Error al convertir GUID`);
             siEnviarEmbed.setTitle(`Error al convertir`)
             .setColor("RANDOM")
             .setDescription(`Esta seguro que introdujo un numero correcto? \nIngresa a esta pagina https://steamid.io/ y pon tu Link de Steam. \nTienes que buscar tu SteamId64 765611.... y luego utilizarlo con el comando \`-guid 765611.....\` para que devuelva el hash.`)
             .setThumbnail('https://i.imgur.com/mnSJzVk.jpg');
        } finally {message.channel.send(siEnviarEmbed)}
    }
}