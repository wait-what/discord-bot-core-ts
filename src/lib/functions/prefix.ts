import { db, config } from '../..'

export default (guildId?: string): string => {
    if (!guildId) return config.defaultPrefix
    else return db.guilds
        .verify(guildId)
        .get(guildId, 'prefix') || config.defaultPrefix
}
