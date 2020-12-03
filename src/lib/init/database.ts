import { config, logger } from '../..'
import { MongoClient, Collection } from 'mongodb'

const client = new MongoClient(config.db.uri, { useNewUrlParser: true, useUnifiedTopology: true })
export let db: {
    users: Collection,
    guilds: Collection,
    verify: {
        user: (id: string) => Promise<void>,
        guild: (id: string) => Promise<void>
    }
} = {} as any

export interface User {
    _id: string
}

export interface Guild {
    _id: string,
    prefix: string
}

export const loaded = new Promise((resolve, reject) => {
    logger.info('Connecting to MongoDB')

    client.connect()
        .then(async () => {
            const mongoDb = client.db(config.db.name)

            db = {
                users: mongoDb.collection('users', error => error && reject(`Couldn't get collection 'users': ${error.name}: ${error.message}`)),
                guilds: mongoDb.collection('guilds', error => error && reject(`Couldn't get collection 'guilds': ${error.name}: ${error.message}`)),
                verify: {
                    user: async id => {
                        if (await db.users.find({ _id: id }).limit(1).count(true)) return

                        await db.users.insertOne({
                            _id: id
                        } as User)
                    },
                    guild: async id => {
                        if (await db.guilds.find({ _id: id }).limit(1).count(true)) return

                        await db.guilds.insertOne({
                            _id: id,
                            prefix: config.defaultPrefix
                        } as Guild)
                    }
                }
            }

            resolve()
            logger.done('Connected to MongoDB')
        })
        .catch(reason => reject(`Couldn't connect to MongoDB: ${reason}`))
}).catch(error => {
    logger.error(error)
    process.exit(1)
})