const discord = require('discord.js')
const config = require('./config.json')




//Variables 
let prefix = '!'

// Status
client.once("ready", () => {
    client.user.setPresence({
        status: 'online',
        activity: {
            name: 'new suggestions',
           type: 'WATCHING',
    }})
})


//Command










client.login()