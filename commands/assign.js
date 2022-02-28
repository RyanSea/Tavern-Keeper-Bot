exports.run = async (bot, message, args) => {

    const msg = await message.author.send(
    'Let\'s assign your skills! React with:' +
    '\n:floppy_disk: : Dev ' +
    '\n:pencil: : Writer ' +
    '\n:people_hugging: : Community' +
    '\nWhen you\'re finished choosing your skills, reply to this message with \`!done\`'
    )
    msg.react("💾")
    msg.react('📝')
    msg.react('🫂')

}

exports.help = {
    name:"assign"
}