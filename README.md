# Discord-Bot-Beta

[![LatestRelease](https://img.shields.io/badge/Latest%20Release-v4.0.0-green)](https://github.com/kittypickles9982/Discord-Bot-Beta/) [![Dependency](https://img.shields.io/badge/Discord.JS-12.3.1-green)](https://github.com/discordjs/discord.js) [![Dependency](https://img.shields.io/badge/Colors-1.4.0-green)](https://www.npmjs.com/package/colors) [![License](https://img.shields.io/badge/license-MIT-green)](https://github.com/kittypickles9982/Discord-Bot/blob/master/LICENSE) [![Node](https://img.shields.io/badge/node-%3E%3D%2012.0.0-green)](https://nodejs.org/en/) [![Latest](https://img.shields.io/github/last-commit/kittypickles9982/Discord-Bot-Beta?color=green)](https://github.com/kittypickles9982/Discord-Bot)

A custom Discord bot written in javascript

This is the latest code for [Discord-Bot](https://github.com/kittypickles9982/Discord-Bot) and may be broken or buggy.
## Notice

This bot is customised for my discord server, so feel free to make the changes you want

This repo won't have a wiki, all features can be found in the wiki on [Discord-Bot](https://github.com/kittypickles9982/Discord-Bot)

ALl of the info not included on this page can be found there

## Beta features
### These are features not in the regular repo
Cooldown

Aliases 

Usage 

These are put at the top of a command file
Here is an example
```js
module.exports = {
  name: 'user',
  description: 'Replies With User Info',
  aliases: ['whois', 'member'],
  usage: '<user>',
  cooldown: 3,
  execute(message, args) {
    message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
  },
};
```

## Libraries

[Discord.js](https://www.npmjs.com/package/discord.js)

[Colors](https://www.npmjs.com/package/colors)

Libraries are not included.

## Install

Install Discord.js by opening a command prompt in the bots folder and do

``npm install discord.js``

Do the same for Colors

``npm install colors``
 
## License

[MIT License](https://github.com/kittypickles9982/Discord-Bot-Beta/blob/master/LICENSE)
