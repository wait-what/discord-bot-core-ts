import { client } from '../..'
import { Embed } from '../../lib/functions'
import { Command, Restrictions } from '../../lib/typings'

const command: Command = {
    run: async msg => {
        msg.channel.send(
            new Embed(`Pong! **${Math.round(client.ws.ping)} ms** :ping_pong:`)
        )
    },
    meta: {
        names: [ 'ping' ],
        description: 'Shows the bot\'s ping',
        usage: null,
        category: 'misc',
        permissions: [],
        restrictions: Restrictions.None
    }
}

export default command