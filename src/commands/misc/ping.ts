import { client } from '../..'
import { Embed } from '../../lib/functions'
import { Command, Restrictions } from '../../lib/typings'

const command: Command = {
    run: async (msg, content) => {
        const time = Date.now()
        const message = await msg.channel.send(new Embed(
            `:ping_pong: Ping to Discord **${client.ws.ping}ms**\n` +
            `:information_source: Response time **measuring...**`
        ))

        message.edit(new Embed(
            `:ping_pong: Ping to Discord **${client.ws.ping}ms**\n` +
            `:information_source: Response time **${Date.now() - time}ms**`
        ))
    },
    meta: {
        names: [ 'ping', 'pong' ],
        description: 'Shows the bot\'s ping',
        usage: null,
        category: 'misc',
        permissions: [],
        restrictions: Restrictions.None
    }
}

export default command