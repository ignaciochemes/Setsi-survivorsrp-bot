module.exports = {
    name: "ping",
    aliases: ["p"],
	category: "informacion",
    description: "Devuelve la latencia de la API al servidor",
	usage: "-ping",
    run: async(client, message, args) => {
        const msg = await message.channel.send(`Haciendo Ping...`)
        msg.edit(`Pongete!\nLa Latencia de Servidor-Usuario es de \`${Math.floor(msg.createdTimestamp - message.createdTimestamp)}\`ms\nLatencia de API respecto al servidor es de \`${Math.round(client.ws.ping)}\`ms\nSi la latencia es alta, no te preocupes... Esto no afecta en absoluto el rendimiento del bot`);
    }
}