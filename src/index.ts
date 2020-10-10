import config from './lib/init/configLoader'
export { config }

import Log75 from 'log75'
export const logger = new Log75(config.logLevel)

import { Client } from 'discord.js'
export const client = new Client()

logger.info('Loading database')
import db from './lib/init/database'
export { db }
Promise.all(Object.values(db).map(x => x.defer))
    .then(() => logger.done('Database loaded'))

logger.info('Loading modules')
import './modules'