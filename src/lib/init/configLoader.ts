import { config as DotEnv } from 'dotenv'
DotEnv()

const config = {
    tokens: {
        discord: process.env.BOT_TOKEN_DISCORD as string
    },
    defaultPrefix: process.env.BOT_DEFAULT_PREFIX as string,
    botAdmins: (process.env.BOT_ADMIN_IDS as string ?? '').split(','),
    embedColor: parseInt(process.env.BOT_EMBED_COLOR as string, 16),
    logLevel: parseInt(process.env.BOT_LOG_LEVEL as string, 10)
}

if (!config.tokens.discord || config.tokens.discord.length != 59)
    throw 'BOT_TOKEN_DISCORD missing or invalid'

if (!config.defaultPrefix || config.defaultPrefix.length < 1 || config.defaultPrefix.length > 64)
    throw 'BOT_DEFAULT_PREFIX missing or invalid'

if (config.botAdmins.length < 1 || config.botAdmins.find(id => id.length < 17 || id.length > 19))
    throw 'BOT_ADMIN_IDS missing or invalid'

if (config.embedColor == undefined || isNaN(config.embedColor) || config.embedColor < 0 || config.embedColor > 0xffffff)
    throw 'BOT_EMBED_COLOR missing or invalid'

if (config.logLevel == undefined || isNaN(config.logLevel) || config.logLevel < 0 || config.logLevel > 2)
    throw 'CONFIG_LOG_LEVEL missing or invalid'

export default config