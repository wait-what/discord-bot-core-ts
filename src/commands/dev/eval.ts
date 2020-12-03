import { client, db, config, logger } from '../..'
import { Embed, Prefix, Clean } from '../../lib/functions'
import { Command, Restrictions } from '../../lib/typings'
import { inspect } from 'util'

const context = {
    client, db, config, logger, Embed, Prefix, Clean
}

const command: Command = {
    run: async (msg, content) => {
        eval(
            `(async () => {` +
                `const { client, db, config, logger, Embed, Prefix, Clean } = context;\n` +
                `${content.replace(/(```\w*\n)|\n```$/g, '')}\n` +
            `})()`
        )
            .then((response: unknown) => {    
                if (response == undefined)
                    msg.react('✅')
                        .catch(() => msg.channel.send('```js\nundefined\n```'))
                else
                    msg.channel.send(`\`\`\`js\n${inspect(response).slice(0, 1989)}\n\`\`\``)
        
                clearTimeout(typing)
                msg.channel.stopTyping()
            })
            .catch((error: Error) => {
                msg.channel.send(`\`\`\`js\n${error?.name ? `${error.name}: ${error.message}`.slice(0, 1991) : `Error: ${error}`}\n\`\`\``)

                clearTimeout(typing)
                msg.channel.stopTyping()
            })
    
        const typing = setTimeout(() => msg.channel.startTyping(), 100)
    },
    meta: {
        names: [ 'eval', 'e' ],
        description: 'Evaluates code',
        usage: null,
        category: null,
        permissions: [],
        restrictions: Restrictions.BotAdmin
    }
}

export default command