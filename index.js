const discord = require('discord.js')
const config = require('./config.json')
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });


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



client.login(config.token)