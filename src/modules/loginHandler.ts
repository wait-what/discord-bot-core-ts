import { client, db, config, logger } from '..'

client.on('ready', async () => {
    const botAdmins = await Promise.all(
        config.botAdmins.map(id =>
            client.users.fetch(id)
                .catch(id => { throw `Could not fetch botAdmin ${id}` })
        )
    )

    logger.done('Logged in')
    logger.info(
        logger.createBox([
            `${client.user?.username ?? '?'} is online`,
            `Admin${botAdmins.length > 1 ? 's:' : ' -'} ${botAdmins.map(admin => admin.tag).join(', ')}`,
            `Cache: ${client.users.cache.size} users | ${client.guilds.cache.size} guilds`,
            `Database: ${db.users.size} users | ${db.guilds.size} guilds`,
            `Default prefix: ${config.defaultPrefix}`
        ])
    )
})

client.on('invalidated', () => {
    logger.error('Client invalidated')
    logger.info('Stopping the bot')
    process.exit
})

Promise.all(Object.values(db).map(x => x.defer))
    .then(() => {
        logger.info('Logging in')
        client.login(config.tokens.discord)
    })