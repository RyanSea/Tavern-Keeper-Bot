exports.run = async (bot, message, args) => {

    const wrongReplyError = 'Please make sure you are replying to the Skills message when usng \`!done\`'
    if (message.channel.type !== 'DM') {
        await message.reply(wrongReplyError)
        return
    }

    const Skills = {
        '💾' : "Dev",
        '📝' : 'Writer',
        '🫂' : 'Community'
    }

    //TODO: turn the Skills message into an embed and put the guild ID inside of embed
    //... to account for the bot being in multiple servers / embeds look better aesthetically
    const guild = bot.guilds.cache.get('911481186013040673')
    const author = guild.members.cache.get(message.author.id)

    //checks if the user is replying and sends wrongReplyError if not
    try {

        const skillsMessage = await message.fetchReference()
        //clears roles
        //await author.roles.remove(author.roles.cache)
        //checks that the user is replying to the skills message
        if (skillsMessage.author.id !== bot.user.id || !skillsMessage.content.startsWith('Let\'s assign your skills!')) {
            await message.reply(wrongReplyError)
            return
        }
        const reactions = Array.from(skillsMessage.reactions.cache)

        let skill, role
        reactions.forEach(async reaction => {
            skill = reaction[1].emoji.name
            //checks if the reaction is a valid skill
            if (Object.keys(Skills).includes(skill)) {
                role = guild.roles.cache.find(r => r.name === Skills[skill]); 
        
                if (skillsMessage.reactions.cache.get(skill).count ===  2) {
                    await author.roles.add(role)
                }
            }
        }) 
        skillsMessage.delete()
        message.channel.send("Skills updated!")

    } catch (error) {
        await message.reply(wrongReplyError)
    }



}

exports.help = {
    name:"done"
}