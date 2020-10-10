import { MessageEmbed } from 'discord.js'
import { client, config } from '../..'

class ImprovedEmbed extends MessageEmbed {
    constructor(content?: string) {
        super()

        this.setColor(config.embedColor)
        content && this.setDescription(content)
    }

    success(): ImprovedEmbed {
        this.description = `:white_check_mark: ${this.description}`
        return this
    }

    info(): ImprovedEmbed {
        this.description = `:information_source: ${this.description}`
        return this
    }

    warn(): ImprovedEmbed {
        this.description = `:warning: ${this.description}`
        return this
    }

    error(): ImprovedEmbed {
        this.description = `:x: ${this.description}`
        return this
    }

    setHeader(title: string): ImprovedEmbed {
        this.setAuthor(title, client.user?.displayAvatarURL({ size: 128 }))
        return this
    }
}

export default ImprovedEmbed