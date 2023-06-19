require('dotenv').config()
const {Client, Events, GatewayIntentBits} = require('discord.js')
const {DISCORD_TOKEN} = process.env

const client = new Client({intents: [GatewayIntentBits.Guilds]})



client.once(Events.ClientReady, c => {
    console.log(`Logged in as ${c.user.tag}`)
})



client.login(DISCORD_TOKEN)