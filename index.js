'use strict';
const discord = require('discord.js')
const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require('./config.json')

//Variables 
let prefix = '-'
let yes = '<a:rtick:629124378700939315>'
let no = '<a:rcross:629124462717173781>'
let temote = '<:pepenotes:905889855567986778>'
let intro = `To make a suggestion, use ${prefix}suggest (suggestion here). Any other messages do not belong in this channel`
client.once('ready', () => {
console.log(`\nPrefix:${prefix} \nName: ${client.user.tag}\n `);
client.user.setPresence({
    status: 'online',
    activity: {
        name: `${prefix}suggest | new suggestions`,
       type: 'WATCHING',
}})
})
client.on('messageCreate' , async message => {
if (!message.content.includes(prefix)) return
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
  if (!message.guild) return 
  if (message.author.bot) return;
const s_channel = client.channels.cache.get("965957179393867786"); //for testing 

  if (command === 'test'){
    message.channel.send('Test completed!')  
  }

if (command === 'suggestion'){
if (!args) return message.channel.send(`You did not provide any suggestion\nCorrect usage of the command: ${prefix}suggest my suggestion`)
let suggestion = args.join(" ")
let embed = new MessageEmbed()
.setTitle(`${temote}New Suggestion`)
.setDescription('Submitter: ' + message.author.tag)
.addField('Content:', `${suggestion}`)
.setTimestamp()
.setFooter({ text: `${message.author.id}`, iconURL: `${message.author.avatarURL()}` });
const ms = await s_channel.send({ embeds: [embed]})
ms.react(yes)
.then(() => ms.react(no))
}
})
client.login(config.token)