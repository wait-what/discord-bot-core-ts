# Discord bot core TS
[![MIT](https://flat.badgen.net/badge/License/MIT/blue)](https://gitlab.com/Wait_What_/discord-bot-core-ts/blob/master/LICENSE.md)
[![SUPPORTSERVER](https://flat.badgen.net/badge/Support%20server/Join/purple)](https://discord.gg/N8Fqcuk)
[![NODE](https://flat.badgen.net/badge/Language/Node.js/green?icon=node)](https://nodejs.org/en/)

### [Discord support server](https://discord.gg/N8Fqcuk)
An easy to use modular TypeScript Discord bot meant to be a blank canvas for anything you might want to create!

## Included features
- Cross-platform support
- Automatic help command (command list)
- Some example commands
- Database
- Some functions to make your life easier (refer to example commands)

## Credit
If you use this to make a bot, I would really love it if you made it open source!

Please include this somewhere in your `README.md`

[![DISCORDBOTCORETS](https://flat.badgen.net/badge/Made%20using/discord-bot-core-ts/blue)](https://gitlab.com/Wait_What_/discord-bot-core-ts)

```md
[![DISCORDBOTCORETS](https://flat.badgen.net/badge/Made%20using/discord-bot-core-ts/blue)](https://gitlab.com/Wait_What_/discord-bot-core-ts)3
```

## Installation guide
### Install the following programs
- NodeJS (at least v10)
- Git
- Yarn
  
### Install build tools
#### Windows
- Run powershell or cmd as administrator
- `npm install --g windows-build-tools`
- This is going to take a while. A long while.

#### Linux
- Arch-based (like manjaro) `sudo pacman -S base-devel`
- Debian-based (like ubuntu) `sudo apt install build-essential`
- Use google for other distributions

### Clone the repository and install dependencies
```sh
# cd Desktop or whatever
git clone https://gitlab.com/Wait_What_/discord-bot-core-ts
cd ./discord-bot-core-ts
yarn
```

### Configure the bot
- Rename `template.env` to `.env`
- Set appropriate values

### Run the bot
> `yarn start`

Press Ctrl+C to stop it, or use the stop command from within Discord

Alternatively, run it in the background using pm2 (`npm install --g pm2`)

```sh
# Start it using
yarn build
pm2 start dist/index.js --name bot
# See logs using
pm2 logs bot
# Restart it using
yarn build
pm2 restart bot
# Stop it using
pm2 stop bot
```

## Adding commands and modules
Add commands by creating additional files in `/commands` or `/modules`. Use existing commands as examples. Be sure to import them in `/commands/index.ts` or `/modules/index.ts`

## Database defaults
The database needs to have a deafault object for guilds and users.

This makes sure that the user exists in the database and has all the properties specified in `/lib/init/database.ts`
```js
db.user.verify(uid)
```

Check out [Enmap documentation](https://enmap.evie.dev/api) for more info.

## Command usage restrictions
`lib/typings/Restrictions` is an enum. Your commands can have multiple restrictions by simply adding the two together.

```js
restrictions: Restrictions.BotAdmin + Restrictions.NoGuild
```

## License
This project is licensed under the [MIT license](./LICENSE). 