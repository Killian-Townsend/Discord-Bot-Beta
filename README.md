# Discord-Bot-Beta

[![LatestRelease](https://img.shields.io/badge/Latest%20Release-v0.8.1-green)](https://github.com/kittypickles9982/Discord-Bot-Beta/) [![Dependency](https://img.shields.io/badge/Discord.JS-12.3.1-green)](https://github.com/discordjs/discord.js) [![Dependency](https://img.shields.io/badge/Colors-1.4.0-green)](https://www.npmjs.com/package/colors) [![Dependency](https://img.shields.io/badge/Reddit-1.2.0-green)](https://www.npmjs.com/package/reddit) [![License](https://img.shields.io/badge/license-MIT-green)](https://github.com/kittypickles9982/Discord-Bot/blob/master/LICENSE) [![Node](https://img.shields.io/badge/node-%3E%3D%2012.0.0-green)](https://nodejs.org/en/) [![Latest](https://img.shields.io/github/last-commit/kittypickles9982/Discord-Bot-Beta?color=green)](https://github.com/kittypickles9982/Discord-Bot)

A custom Discord bot written in javascript

This is the latest code for [Discord-Bot](https://github.com/kittypickles9982/Discord-Bot) and may be broken or buggy.
## Notice

This bot is customised for my discord server, so feel free to make the changes you want

This repo will soon have a wiki, but for now, all features can be found in the wiki on [Discord-Bot](https://github.com/kittypickles9982/Discord-Bot)

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
## Features coming out soon
### Reddit API
Get the top/hottest memes or entitled people stories!
### YouTube API/Music Support
Search music or a video from YouTube and play it an a VC
### Multi Guild Support!
Allows for guild specific settings!
### Guild Specific User Profiles
Keep track of kicks, mutes, and warns for a user
Specific to that guild
### Global User Profiles
Allows users to access specific things from any server with your bot!
Allows cross-server economy or collecting
### Economy 
Buy, sell, and trade!
### Better Mod Tools
Allows better logging and moderation tools
### Ranks
Assign roles and give rewards based on how active they are!

## Libraries

[Discord.js](https://www.npmjs.com/package/discord.js)

[Colors](https://www.npmjs.com/package/colors)

[Reddit](https://www.npmjs.com/package/reddit)

Libraries are not included.

## Install

Install dependencies by opening a command prompt in the bots folder and do

``npm install``
 
## License

[MIT License](https://github.com/kittypickles9982/Discord-Bot-Beta/blob/master/LICENSE)
