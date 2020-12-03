import { config as DotEnv } from 'dotenv'
DotEnv()

const config = {
    tokens: {
        discord: process.env.BOT_TOKEN_DISCORD as string
    },
    db: {
        uri: process.env.BOT_DB_URI as string,
        name: process.env.BOT_DB_NAME as string
    },
    defaultPrefix: process.env.BOT_DEFAULT_PREFIX as string,
    botAdmins: (process.env.BOT_ADMIN_IDS as string ?? '').split(','),
    embedColor: parseInt(process.env.BOT_EMBED_COLOR as string, 16),
    logLevel: parseInt(process.env.BOT_LOG_LEVEL as string, 10),
    blacklist: { // optional
        users: process.env.BOT_BLACKLIST_USERS ?? '',
        guilds: process.env.BOT_BLACKLIST_GUILDS ?? ''
    }
}

for (const element of [ 'BOT_TOKEN_DISCORD', 'BOT_DB_URI', 'BOT_DB_NAME', 'BOT_DEFAULT_PREFIX', 'BOT_ADMIN_IDS', 'BOT_EMBED_COLOR', 'BOT_LOG_LEVEL' ])
    if (!process.env[element]) throw `Environment variable ${element} is missing`

export default config