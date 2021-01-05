module.exports = {
	name: 'user_join',
	execute(member, client, config) {

        /*//if welcome message is set, try to send DM
        if (config.welcomeChannel) {
            try {
                //attempts to send the welcome message
                member.send(joinMsg.joinMsg);
            } catch (error) {
                //DM won't go through if the users privacy settings don't allow it
                console.log(`[WARNING] Couldn't Send Welcome DM: ${error}`.yellow.bold);
            }
        }*/

        const fs = require('fs');

        //add user profile if needed
        if(!fs.existsSync(`./data/users/${member.user.id}.json`)){
            fs.writeFileSync(`./data/users/${member.user.id}.json`, defMem);
        }

        if(!fs.existsSync(`./data/servers/${member.guild.id}/users/{member.user.id}.json`)){
            var defMem = '{\n   "version": "2",\n   "warns": "0",\n    "mutes": "0",\n    "kicks": "0",\n}';
            fs.writeFileSync(`./data/servers/${member.guild.id}/users/${member.user.id}.json`, defMem);
        }
        //sends message in welcome channel if set
        if (config.welcomeChannel) {
            client.channels.cache.get(config.welcomeChannel).send(`Hello **${member.user.username}**! Welcome to ${member.guild.name}!`);
        }

        //sends message in mod channel if set
        if (config.modChannel) {
            message.channel.send({embed: {
                "color": "8781705",
                "author": {
                  "name": member.user.username,
                  "icon_url": member.user.avatarURL
                },
                "title": "User Joined",
                "description": "<@{$member.user.id}> Joined",
                "timestamp": new Date(),
                "footer": {
                  "text": "ID: ${member.user.id}"
                }
              }
            });
        }
	}
};