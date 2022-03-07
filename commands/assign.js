exports.run = async (bot, message, args) => {

    const guild = bot.guilds.cache.get('911481186013040673')
    const skills = {
        Cleric : '949092324833648650',
        Wizard : '949092324489707521',
        TavernKeeper : "949092325131444245",
        Paladin : "949092324485521459",
        Archer : "949092273973526629",
        Monk : "949092324418420737",
    }

    var msg = await message.channel.send(
    'Choose one Primary Skill! React with:' +
    `\n${guild.emojis.cache.get(skills.Cleric)} : Cleric` +
    `\n${guild.emojis.cache.get(skills.Wizard)} : Wizard`  +
    `\n${guild.emojis.cache.get(skills.TavernKeeper)} : Tavern Keeper`  +
    '\nWhen you\'re finished choosing your Primary Skill, react with 👍'
    )

    await msg.react(guild.emojis.cache.get(skills.Cleric))
    await msg.react(guild.emojis.cache.get(skills.Wizard))
    await msg.react(guild.emojis.cache.get(skills.TavernKeeper))
    await msg.react('👍')

    var primary_skill;
    var secondary_skill;
    var wrongMessage;

   
    bot.on('messageReactionAdd', async (reaction, user) => {

        var skillsMessage = await reaction.message
        if (user.bot) return
        else if (reaction.emoji.name != '👍') return
        if(wrongMessage) {
            wrongMessage.delete()
            wrongMessage = false
        }

        let reactions = skillsMessage.reactions.cache;
        let chosenReactions = reactions.filter(reaction => reaction.count === 2);

        if (Array.from(chosenReactions).length !== 2) {
            
            chosenReactions.forEach(async (reaction, emoji) => {
                await reaction.users.remove(message.author.id)
                await skillsMessage.react(emoji)
            })
            wrongMessage = await message.channel.send('Please Choose **One** Skill, Then Click 👍')
            return
        }

        if (!primary_skill) {
            chosenSkill = Array.from(chosenReactions.filter(reaction => reaction.name !== '👍'))[0][0]
            primary_skill = Object.keys(skills).find(skill => skills[skill] === chosenSkill)

            skillsMessage = await message.channel.send(
                `You have chosen ${primary_skill} as your Primary Skill! ` +
                '\n\nNow choose one Secondary Skill! React with:' +
                `\n${guild.emojis.cache.get(skills.Paladin)} : Paladin` +
                `\n${guild.emojis.cache.get(skills.Archer)} : Archer` + 
                `\n${guild.emojis.cache.get(skills.Monk)} : Monk` + 
                '\nWhen you\'re finished choosing your Secondary Skill, react with 👍'
                )
            await skillsMessage.react(guild.emojis.cache.get(skills.Paladin))
            await skillsMessage.react(guild.emojis.cache.get(skills.Archer))
            await skillsMessage.react(guild.emojis.cache.get(skills.Monk))
            await skillsMessage.react('👍')
        } else {
            chosenSkill = Array.from(chosenReactions.filter(reaction => reaction.name !== '👍'))[0][0]
            secondary_skill = Object.keys(skills).find(skill => skills[skill] === chosenSkill)
            await message.channel.send(
                `You have chosen **${secondary_skill}** as your Secondary Skill and **${primary_skill}** as your Primary! ` 
                )
            
        }
    

        
    })
    if (primary_skill && secondary_skill) {
        message.channel.send('worked')
        await msg.delete()
        await skillsMessage.delete()
    }
    console.log('yo')


}

exports.help = {
    name:"assign"
}