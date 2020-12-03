import { db, config } from '../..'

export default async (guildId?: string): Promise<string> => {
    if (!guildId) return config.defaultPrefix
    
    await db.verify.guild(guildId)
    const guild = await db.guilds.findOne({ _id: guildId })

    return guild.prefix as string || config.defaultPrefix
}
