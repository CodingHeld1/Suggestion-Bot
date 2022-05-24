'use strict';
const discord = require('discord.js')
const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});
const config = require('./config.json')

//Variables 
let prefix = '-'
//Lifeboat server emotes
// let yes = '<a:rtick:629124378700939315>'
// let no = '<a:rcross:629124462717173781>'
// let temote = '<:pepenotes:905889855567986778>'

//testing emotes
//test server emotes
let yes = '<a:rtick:977633786051330078>'
let no = '<a:rcross:977633814325125210>'
let temote = '<:pepenotes:977633753688080435>'
let intro = `To make a suggestion, use ${prefix}suggest (suggestion here). Any other messages do not belong in this channel`
client.once('ready', () => {
console.log(`\nPrefix:${prefix} \nName: ${client.user.tag}\n `);
client.user.setPresence({ activities: [{ name: 'with new suggestions' }],type: 'WATCHING', status: 'dnd' });
})


client.on('messageCreate' , async message => {
   
if (!message.content.includes(prefix)) return
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
  if (!message.guild) return 
  if (message.author.bot) return;
const s_channel = client.channels.cache.get("965957179393867786"); //for testing
const staff = client.channels.cache.get("965719796983402536"); 

  if (command === 'test'){
    message.channel.send('Test completed!')  
  }

if (command === 'suggest'){
    message.delete()
if (!args) return message.channel.send(`You did not provide any suggestion\nCorrect usage of the command: ${prefix}suggest my suggestion`)

let suggestion = args.join(" ")
let player = message.author


const filter = (reaction, user) => {
	return ['👍', '👎'].includes(reaction.emoji.name) && user.id != client.user.id 
};
let embed1 = new MessageEmbed()
.setTitle(`> ${temote} New Suggestion`)
.setDescription('Submitter: ' + message.author.tag+`\nReact with ${yes} to approve the suggestion`)
.addField('Content:', `${suggestion}`)
.setTimestamp()
.setFooter({ text: `${message.author.id}`, iconURL: `${message.author.avatarURL()}` });
const ms2 = await staff.send({embeds:[embed1]})
ms2.react('👍')
.then(() => ms2.react('👎'))
let p_dm1 = new MessageEmbed()
    .setAuthor({ name: 'Lifeboat Network', iconURL: 'https://images-ext-1.discordapp.net/external/rJ-RxAvsYQ38MtN70-WgSEzaa663b0GEgHokLC6Jh3M/https/bugs.lbsg.net/images/logo.png', url: 'https://discord.gg/lifeboat' })
	.setDescription(`Hey, <@${player.id}>. Please wait until the suggestion gets approved or rejected by a staff member.`)
    .setTimestamp()
    .setColor('#E2982E')
    .setFooter({ text: `${message.author.id}`, iconURL: `${message.author.avatarURL()}` });
    message.author.send({embeds: [p_dm1]})


ms2.awaitReactions({ filter, max: 1, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '👍') {
			staff.send(`${yes} The suggestion has been approved sucessfully`).then(m => setTimeout(() => { m.delete() }, 5000))
            const embed = new MessageEmbed()
            .setTitle(`> The suggestion has been approved`)
            .setDescription('Submitter: ' + message.author.tag+`\n`)
            .addField('Content:', `${suggestion}`)
            .setTimestamp()
            .setFooter({ text: `${message.author.id}`, iconURL: `${message.author.avatarURL()}` });
            ms2.edit({ embeds: [embed] });
            let embed1 = new MessageEmbed()
                .setTitle(`> ${temote} New Suggestion`)
                .setDescription('Submitter: ' + message.author.tag)
                .addField('Content:', `${suggestion}`)
                .setTimestamp()
                .setFooter({ text: `${message.author.id}`, iconURL: `${message.author.avatarURL()}` });
                s_channel.send({ embeds: [embed1]})

                let p_dm2 = new MessageEmbed()
                    .setAuthor({ name: 'Lifeboat Network', iconURL: 'https://images-ext-1.discordapp.net/external/rJ-RxAvsYQ38MtN70-WgSEzaa663b0GEgHokLC6Jh3M/https/bugs.lbsg.net/images/logo.png', url: 'https://discord.gg/lifeboat' })
	                .setDescription(`Hey, <@${player.id}>. Your suggestion got accepted by the staff team. It should be sent in the ${s_channel} for voting`)
                    .setTimestamp()
                    .setColor('GREEN')
                    .setFooter({ text: `${message.author.id}`, iconURL: `${message.author.avatarURL()}` });
                message.author.send({embeds: [p_dm2]})

		} else {
            staff.send(`${no} The suggestion has been denied sucessfully`).then(m => setTimeout(() => { m.delete() }, 5000))
            const embed = new MessageEmbed()
            .setTitle(`> The suggestion has been denied`)
            .setDescription('Submitter: ' + message.author.tag)
            .addField('Content:', `${suggestion}`)
            .setTimestamp()
            .setFooter({ text: `${message.author.id}`, iconURL: `${message.author.avatarURL()}` });
            ms2.edit({ embeds: [embed] });
            let p_dm3 = new MessageEmbed()
            .setAuthor({ name: 'Lifeboat Network', iconURL: 'https://images-ext-1.discordapp.net/external/rJ-RxAvsYQ38MtN70-WgSEzaa663b0GEgHokLC6Jh3M/https/bugs.lbsg.net/images/logo.png', url: 'https://discord.gg/lifeboat' })
            .setDescription(`Hey, <@${player.id}>. Your suggestion got denied by the staff team.`)
            .setTimestamp()
            .setColor('RED')
            .setFooter({ text: `${message.author.id}`, iconURL: `${message.author.avatarURL()}` });
        message.author.send({embeds: [p_dm3]})
		}
	})
	.catch(collected => {
        return
	});



    



}


})

client.on('messageCreate' , async message => {
    if(message.channel.id === "965957179393867786"){
        if (!message.author.bot) return
            message.react(yes)
            message.react(no)
}
})


client.login(config.token)