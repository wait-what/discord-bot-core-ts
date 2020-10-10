import { client, logger } from '../..'
import { Embed } from '../../lib/functions'
import { Command, Restrictions } from '../../lib/typings'

const command: Command = {
    run: async msg => {
        if (!(/\S+\s+\S*s\S*/i).test(msg.content))
            await msg.channel.send(
                new Embed('Stopping the bot')
            )

        logger.warn('Stopping the bot...')

        await client.user?.setPresence({ status: 'invisible' })
        client.destroy()

        setTimeout(() => process.exit(0), 1000)
    },
    meta: {
        names: [ 'stop' ],
        description: 'Stops the bot',
        usage: null,
        category: null,
        permissions: [],
        restrictions: Restrictions.BotAdmin
    }
}

export default command