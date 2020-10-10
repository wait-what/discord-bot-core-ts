import { client, db, config, logger } from '../..'
import { Embed, Prefix, Clean } from '../../lib/functions'
import { Command, Restrictions } from '../../lib/typings'
import { inspect } from 'util'

const context = {
    client, db, config, logger, Embed, Prefix, Clean
}

const command: Command = {
    run: async msg => {
        eval(`(async () => {\n${msg.content.replace(/^(\S+\s+)?(```\w+\n|\n```$)?/, '')}\n})()`)
            .then((response: unknown) => {
                response = inspect(response).slice(0, 1980)
    
                if (response != 'undefined') msg.channel.send(`\`\`\`js\n${response}\n\`\`\``)
                else msg.react('✅').catch(() => msg.channel.send('```js\nundefined\n```'))
        
                clearTimeout(typing)
                msg.channel.stopTyping()
            })
            .catch((error: Error) => {
                msg.channel.send(`\`\`\`js\n${error.name}: ${error.message}\`\`\``)

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