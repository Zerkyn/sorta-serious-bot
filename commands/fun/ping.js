const {SlashCommandBuilder} = require('discord.js')
const wait = require('node:timers/promises').setTimeout

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        await interaction.reply({ content: 'Pong!', ephemeral: true})
        
        //to edit a reply
        // await wait(2_000)
        // await interaction.editReply({ content: 'Pong again!', ephemeral: true})
        
        // to defer reply if longer than 3 seconds is needed
        // await interaction.deferReply()
        // await wait(4_000)
        // await interaction.editReply('Pong!')

        // await interaction.followUp('Pong again!')
    },
}