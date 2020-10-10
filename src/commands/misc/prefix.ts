import { db, config } from '../..'
import { Embed, Clean } from '../../lib/functions'
import { Command, Restrictions } from '../../lib/typings'

const command: Command = {
    run: async msg => {
        const prefix = msg.content.replace(/^\S+\s*/, '') || null
        
        if (!prefix) {
            db.guilds
                .verify(msg.guild?.id)
                .set(msg.guild?.id as string, null, 'prefix')

            msg.channel.send(
                new Embed(`Reset the prefix to **\`${config.defaultPrefix}\`**`).success()
            )
        }
        
        else {
            if (prefix.match(/\s/)) return msg.channel.send(
                new Embed('Prefixes can\'t have spaces').error()
            )

            if (prefix.length < 1 || prefix.length > 32) return msg.channel.send(
                new Embed('Prefixes must be 1-32 characters long').error()
            )

            db.guilds
                .verify(msg.guild?.id)
                .set(msg.guild?.id as string, prefix, 'prefix')
                
            msg.channel.send(
                new Embed(`Set the prefix to **\`${Clean(prefix)}\`\**`).success()
            )
        }
    },
    meta: {
        names: [ 'prefix' ],
        description: 'Change the prefix',
        usage: '[prefix]',
        category: 'misc',
        permissions: [ 'MANAGE_MESSAGES' ],
        restrictions: Restrictions.NoDm
    }
}

export default command