import Enmap from 'enmap'

export default {
    users: new (class extends Enmap {
        verify(id?: string | number): Enmap {
            id && this.ensure(id, {
                block: false
            })
            return this
        }
    })('userdata'),
    guilds: new (class extends Enmap {
        verify(id?: string | number): Enmap {
            id && this.ensure(id, {
                prefix: null
            })
            return this
        }
    })('guilddata'),
    bot: new Enmap('botdata')
}