import config from './lib/init/configLoader'
export { config }

import Log75 from 'log75'
export const logger = new Log75(config.logLevel, )

import { Client } from 'discord.js'
export const client = new Client()

import { db, loaded } from './lib/init/database'
export { db }

logger.debug('Waiting for database')
loaded.then(() => {
    logger.info('Loading modules')
    import('./modules')
})
