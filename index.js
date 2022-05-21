'use strict';
const discord = require('discord.js')
const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require('./config.json')



//Variables 
let prefix = '!'

client.once('ready', () => {
console.log(`\nPrefix:${prefix} \nName: ${client.user.tag}\n `);
client.user.setPresence({
    status: 'online',
    activity: {
        name: 'new suggestions',
       type: 'WATCHING',
}})
})


client.on('messageCreate' , message => {

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
  if (!message.guild) return 
  if (message.author.bot) return;
const s_channel = client.channels.cache.get("965957179393867786"); //for testing 

  if (command === 'test'){
    message.channel.send('Test completed!')  
  }




})

client.login(config.token)