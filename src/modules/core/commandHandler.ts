import { client, logger, config } from '../..'
import { Embed, Prefix } from '../../lib/functions'
import { Restrictions } from '../../lib/typings'
import Commands from '../../commands'

logger.debug('Loading module commandHandler')

client.on('message', async msg => {
    if (
        config.blacklist.users.includes(msg.author.id) ||
        (msg.guild && config.blacklist.guilds.includes(msg.guild.id))
    ) return
    
    const prefix = await Prefix(msg.guild?.id)

    if (msg.content === `<@!${client.user?.id}>`)
        msg.channel.send(
            new Embed(`The **prefix** is \`${prefix}\``).info()
        ).catch(() => {})

    else if (
        msg.content.startsWith(prefix) ||
        msg.content.startsWith(`<@!${client.user?.id}>`)
    ) {
        const unprefixedContent = msg.content.startsWith(prefix) ?
            msg.content.slice(prefix.length) :
            msg.content.slice((client.user?.id.length as number) + 4).replace(/^\s+/, '')

        const commandName = (unprefixedContent.match(/^\S+/) || [ '' ])[0]
        if (!commandName) return

        const cleanContent = unprefixedContent.slice(commandName.length).replace(/^\s+/, '')

        const command = Commands.find(command => command.meta.names.includes(commandName))
        if (command) {
            const debugString = `${msg.author.tag} | ${msg.author.id} => ` +
                `${msg.guild ? `${msg.guild.name} | ${msg.guild.id} =>` : ''} ${msg.content}`

            if (msg.channel.type === 'text') {
                const missingPermissions = command.meta.permissions
                    .filter(permission => !msg.member?.hasPermission(permission))
                    .map(permission => `:white_small_square: **\`${permission.replace('_', ' ')}\`**`)

                if (missingPermissions.length > 0) {
                    msg.channel.send(
                        new Embed(`You need these **permissions**:\n${missingPermissions.join('\n')}`)
                            .setHeader('Missing permissions')
                            .error()
                    )
                    logger.debug(`${debugString} => missing permissions`)
                    return
                }
            }

            if ((command.meta.restrictions & Restrictions.BotAdmin) && !config.botAdmins.includes(msg.author.id)) {
                logger.warn(`${debugString} => BotAdmin`)
                return
            }
            
            if ((command.meta.restrictions & Restrictions.NoDm) && msg.channel.type === 'dm') {
                msg.channel.send(
                    new Embed('This command is **not available in DMs**').error()
                )
                logger.debug(`${debugString} => NoDm`)
                return
            }

            if ((command.meta.restrictions & Restrictions.NoGuild) && msg.channel.type === 'text')  {
                msg.channel.send(
                    new Embed('This command is **only available in DMs**').error()
                )
                logger.debug(`${debugString} => NoGuild`)
                return
            }

            command.run(msg, cleanContent)
                .then(() => logger.debug(debugString))
                .catch((error: Error) => logger.error(`${debugString} => ${error.name}: ${error.message}`))
        }
    }
})