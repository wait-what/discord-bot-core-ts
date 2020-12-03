import { client, db, config } from '../..'
import { Embed, Clean } from '../../lib/functions'
import { Command, Restrictions } from '../../lib/typings'

const command: Command = {
    run: async (msg, content) => { 
        if (!content) {
            await db.guilds.updateOne({ _id: msg.guild?.id }, { $set: { prefix: config.defaultPrefix } })
            
            msg.channel.send(
                new Embed(`**Reset** the **prefix** to **\`${config.defaultPrefix}\`**`).success()
            )
        }
        
        else {
            if (content.match(/^['"].+['"]$/)) content = content.replace(/^['"]|['"]$/g, '')

            if (content.length > 128) return msg.channel.send(
                new Embed('Prefixes can\'t be **longer** than **128 characters**').error()
            )

            await db.guilds.updateOne({ _id: msg.guild?.id }, { $set: { prefix: content } })
                
            msg.channel.send(
                new Embed(
                    `**Set** the **prefix** to **\`${Clean(content)}\`**\n\n` +
                    'If it ends with a **space**, put it in **quotes**: `"example "`\n' +
                    `If **broken**, say **\`@${client.user?.tag} prefix\`** to **reset** it`
                ).success()
            )
        }
    },
    meta: {
        names: [ 'prefix' ],
        description: 'Change the prefix',
        usage: '[prefix] | "prefix"',
        category: 'misc',
        permissions: [ 'MANAGE_MESSAGES' ],
        restrictions: Restrictions.NoDm
    }
}

export default command