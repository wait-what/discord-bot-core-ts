import { client, db, config, logger } from '../..'
import { performance } from 'perf_hooks'

logger.debug('Loading module loginHandler')

client.on('ready', async () => {
    const botAdmins = await Promise.all(
        config.botAdmins.map(id =>
            client.users.fetch(id)
                .catch(id => {
                    logger.error(`Could not fetch bot administrator ${id}`)
                    process.exit(1)
                })
        )
    )

    logger.blank('')
    logger.done(
        logger.table([
            `${client.user?.username ?? '?'} is online`,
            `Startup took ${Math.round(performance.now())}ms\n` +
            `Admin${botAdmins.length > 1 ? 's:' : ' -'} ${botAdmins.map(admin => admin.tag).join(', ')}\n` +
            `Cache: ${client.users.cache.size} users | ${client.guilds.cache.size} guilds\n` +
            `Database: ${await db.users.estimatedDocumentCount()} users | ${await db.guilds.estimatedDocumentCount()} guilds\n` +
            `Default prefix: ${config.defaultPrefix}`
        ])
    )
    logger.blank('')
})

client.on('error', error => logger.error(`DiscordJS error: ${error.name}: ${error.message}`))

logger.info('Logging in')
client.login(config.tokens.discord)
