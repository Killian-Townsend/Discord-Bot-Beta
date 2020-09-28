module.exports = {
	name: 'user_leave',
	execute(member, client, config) {

        //sends message in welcome channel if set
        if (config[6]) {
            client.channels.cache.get(config[6]).send(`Goodbye **${member.user.username}**! Hope to see you again!`);
        }

        //sends message in mod channel if set
        if (config[4]) {
            message.channel.send({embed: {
                "color": "8781705",
                "author": {
                  "name": member.user.username,
                  "icon_url": member.user.avatarURL
                },
                "title": "User Left",
                "description": "<@{$member.user.id}> Left",
                "timestamp": new Date(),
                "footer": {
                  "text": "ID: ${member.user.id}"
                }
              }
            });
        }
	},
};