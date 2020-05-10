const { steamapi } = require('./config.json');
const { MessageEmbed } = require("discord.js");
const axios = require('axios');
const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
const fs = require("fs");

const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
config({
    path: __dirname + "/.env"
});

["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
});

client.on("ready", () => {
    console.log(`Estoy online, mi nombre es ${client.user.username}`);
    client.user.setActivity(`-help | SurvivorsRP`, { type: "LISTENING" });

});

client.on("message", async message => {
    const prefix = "-";
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.lenght === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command)
        command.run(client, message, args);

});

// client.on('message', message => {
//     //If the sender has these permissions
//     if (message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {

//         //And the content has the command !64id on it calling the bot
//         if (message.content.startsWith(`${prefix}id64`)) {

//             //Get the content minus the !64id command
//             let msgTyped = message.content.substr(6);

//             //Check for the help command
//             if (msgTyped == "ayuda") {
//                 sendHelp();
//             }
//             //Start the search for an ID or User
//             else {
//                 searchString(msgTyped);
//             }

//         }
//     }

//     function searchString(msg) {

//         //Looking for a valid ID on the content
//         //Check for the index of 76 and get the next 17 numbers
//         let index64ID = msg.indexOf("76");
//         let final64ID = msg.slice(index64ID, index64ID + 17);

//         //Check if the result is only numbers and has 17 digits
//         if (final64ID.match(/^[0-9]+$/) != null && final64ID.length == 17) {
//             getProfile(final64ID);
//         }
//         //If not then must be a username
//         else {
//             byUser(msg);
//         }

//     }

//     //Search Steam API by username
//     function byUser(typedUser) {

//         //Make the request to Steam with the possible username typed
//         axios.get('http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/', {
//                 params: {
//                     key: steamapi,
//                     vanityurl: typedUser
//                 }
//             })
//             //Dealing with the response
//             .then(function(response) {
//                 let idFound = response.data.response.steamid; //Field for the steam64ID
//                 let status = response.data.response.success; //Must be 1 for success

//                 //If nothing was found
//                 if (status != 1) {
//                     showError();
//                 } else {
//                     //Send the 64ID found to the getProfile function
//                     getProfile(idFound);
//                 }
//             })

//     }

//     //Search Steam API with the steam64ID found
//     function getProfile(id) {

//         //Make the request to a different link
//         axios.get('https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/', {
//             params: {
//                 key: steamapi,
//                 steamids: id
//             }
//         })

//         //Dealing with the response
//         .then(function(response) {

//             //Usual path pre defined
//             let resPath = response.data.response.players[0]; // 0 for the first profile found

//             //The data we want
//             let infoReal = resPath.realname;
//             let infoNick = resPath.personaname;
//             let infoPic = resPath.avatarmedium;
//             let infoCountry = resPath.loccountrycode;
//             let infoCreated = resPath.timecreated;
//             let infoState = resPath.communityvisibilitystate;

//             //Check for private/public profile
//             if (infoState == 2) {

//                 //Making final embed for Private profiles
//                 const resultEmbed = new Discord.MessageEmbed()

//                 .setColor('#0099ff')
//                     .setTitle(infoNick)
//                     .setDescription('Here is what I found')
//                     .addField('Profile State:', 'Private')
//                     .addField('Steam64ID:', '' + id)
//                     .setImage(infoPic)

//                 message.channel.send(resultEmbed);
//             }

//             //If set to public we get more info on the profile
//             else {


//                 //Formatting the date we got from Steam

//                 //Convert the UTC time/date
//                 let dateConverted = new Date(0);
//                 dateConverted.setUTCSeconds(infoCreated);

//                 //Make it a string
//                 let finalDate = dateConverted.toString();

//                 //Grab just the essential, date and time
//                 let finalDateIndex = finalDate.indexOf("GMT");
//                 finalDate = finalDate.substr(0, finalDateIndex);

//                 //--------------------------------------------------

//                 //Checkin for undefined fields

//                 if (typeof infoReal == 'undefined') {
//                     infoReal = "Not Found";
//                 }
//                 if (typeof infoCountry == 'undefined') {
//                     infoCountry = "Not Found";
//                 }
//                 if (typeof infoReal == 'undefined') {
//                     infoReal = "Not Found";
//                 }
//                 //--------------------------------------------------

//                 //Making final embed for public profiles
//                 const resultEmbed = new Discord.MessageEmbed()

//                 .setColor('#0099ff')
//                     .setTitle(infoNick)
//                     .setDescription('Here is what I found')
//                     .addField('Profile State:', 'Public')
//                     .addField('Steam64ID:', '' + id)
//                     .addField('Real name:', '' + infoReal)
//                     .addField('Created:', '' + finalDate)
//                     .addField('Country:', '' + infoCountry)
//                     .setImage(infoPic)

//                 message.channel.send(resultEmbed);
//             }


//         })
//     }

//     //Error caused by invalid steam64ID or username not found
//     function showError() {
//         message.channel.send('Oh oh! User not found or incorrect steam64ID');
//     }

//     //Function for the help embed
//     function sendHelp() {
//         //Creatin embed for the help command
//         const helpEmbed = new Discord.MessageEmbed()
//             .setColor('#0099ff')
//             .setTitle('Hello there!')
//             .setDescription('Usage:\n!64id username_here \n!64id steam64id_here')
//             .setImage("https://i.pinimg.com/236x/b6/bc/54/b6bc54bd55be25bed53d042c75d45e91--south-park-episodes-homemade-costumes.jpg")
//         message.channel.send(helpEmbed);
//     }


//     //Closing the client.on function
// })

client.login(process.env.TOKEN);