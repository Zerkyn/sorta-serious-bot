require('dotenv').config()
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js')
const { DISCORD_TOKEN } = process.env
//Node's file system module to read the file in commands folder
const fs = require('node:fs')
//Nodes's path utility module constructs paths to files
const path = require('node:path')

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

//class that extends JS Map class. use to store and retrieve commands
client.commands = new Collection()

//---Commands ---------------------------
const foldersPath = path.join(__dirname, 'commands')
const commandFolders = fs.readdirSync(foldersPath)

for (const folder of commandFolders) {
    //constructs path the commands dir for fs.readdirSync() to read and return an array of file names
    const commandsPath = path.join(foldersPath, folder)
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file)
        const command = require(filePath)
        //Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command)
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
        }
    }
}
// --------------------------------------

//--- Events ----------------------------
const eventsPath = path.join(__dirname, 'events')
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'))

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file)
    const event = require(filePath)
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args))
    } else {
        client.on(event.name, (...args) => event.execute(...args))
    }
}
//---------------------------------------

client.login(DISCORD_TOKEN)