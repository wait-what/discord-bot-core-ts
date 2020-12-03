import { Util } from 'discord.js'
import { Embed, Prefix, Clean } from '../../lib/functions'
import { Command, Restrictions } from '../../lib/typings'
import Commands from '..'

let categoryNames: string[] = []
const categories: [ string, string ][] = []
const load = () => {
    const buffer: Map<string, string[]> = new Map()

    for (const item of Commands) {
        const categoryName = item.meta.category

        if (categoryName) {
            if (!buffer.has(categoryName)) {
                buffer.set(categoryName, [])
                categoryNames.push(categoryName)
            }

            buffer.get(categoryName)?.push(
                `:small_${item.meta.restrictions & Restrictions.NoDm ? 'orange' : 'blue'}_diamond: ` +
                `**\`{{prefix}}${item.meta.names[0]}\`** ${item.meta.description}` +
                (item.meta.usage ? ` \`{{prefix}}${item.meta.names[0]} ${item.meta.usage}\``: '')
            )
        }
    }

    for (const categoryName of buffer.keys())
        Util.splitMessage(
            (buffer.get(categoryName) as string[]).join('\n'),
            { maxLength: 1990 - categoryName.length }
        )
            .forEach(category => categories.push([ categoryName, category ]))

    categoryNames = categoryNames.sort()
}

const cooldowns = new Set()

const command: Command = {
    run: async (msg, content) => {
        if (categories.length < 1) load()

        const prefix = Clean(await Prefix(msg.guild?.id))
        const categoryName = content.toLowerCase()

        if (categoryName == 'all' && cooldowns.has(msg.author.id)) return

        if (!categoryName || (categoryName != 'all' && !categoryNames.includes(categoryName))) {
            msg.channel.send(
                new Embed(
                    '**Choose a category**:\n' +
                    [ 'all', ...categoryNames ]
                        .map(category => `:white_small_square: \`${prefix}help ${category}\``)
                        .join('\n')
                )
                .setHeader('Commands')
            )
            return
        }

        const chunks = categories
            .filter(category => categoryName === 'all' || category[0] === categoryName)
            
        await Promise.all(
            chunks.map(chunk =>
                msg.channel.send(
                    new Embed(chunk[1].replace(/{{prefix}}/g, prefix))
                        .setHeader(chunk[0][0].toUpperCase() + chunk[0].slice(1))
                ).catch(() => {})
            )
        )

        if (categoryName === 'all') {
            cooldowns.add(msg.author.id)
            setTimeout(() => cooldowns.delete(msg.author.id), 15 * 1000)
        }
    },
    meta: {
        names: [ 'help' ],
        description: 'Shows all commands',
        usage: null,
        category: 'misc',
        permissions: [],
        restrictions: Restrictions.NoGuild
    }
}

export default command