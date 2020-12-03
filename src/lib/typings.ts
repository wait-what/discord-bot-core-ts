import { Message, PermissionString } from 'discord.js'

interface Command {
    run: (msg: Message, cleanContent: string) => Promise<void | any>,
    meta: {
        names: string[],
        description: string,
        usage: string | null,
        category: string | null,
        permissions: PermissionString[],
        restrictions: number
    }
}

enum Restrictions {
    None = 0,
    BotAdmin = 2 ** 0,
    NoDm = 2 ** 1,
    NoGuild = 2 ** 2
    // 2 ** 3 ...
}

export {
    Command, Restrictions
}