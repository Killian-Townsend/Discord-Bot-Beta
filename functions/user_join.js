module.exports = {
	name: 'user_join',
	execute(member, client, config) {

        //if welcome message is set, try to send DM
        if (config[8]) {
            try {
                //attempts to send the welcome message
                member.send(joinMsg.joinMsg);
            } catch (error) {
                //DM won't go through if the users privacy settings don't allow it
                console.log(`[WARNING] Couldn't Send Welcome DM: ${error}`.yellow.bold);
            }
        }

        //sends message in welcome channel if set
        if (!config[6] == undefined) {
            client.channels.cache.get(config[6]).send(`Hello **${member.user.username}**! Welcome to ${member.guild.name}!`);
        }

        //sends message in mod channel if set
        if (config[4]) {
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