module.exports = {
	name: 'ban',
	description: 'Bans User Mention - Syntax : ban @USER reason',
	execute(message, args, addons) {

		try {

		    const ops = addons[4];
		    const mod_ch = addons[6];
		    const guild_id = addons[7];
		    const server_name = addons[8];
		    const client = addons[3];
		    const ls = ops.includes(message.author.tag);
		    const Use = message.guild.member(message.mentions.users.first());
		    args.shift();
            var ban_reason;

		    if (args[0] == undefined) {
		        var ban_reason = "No Reason Given";
		    } else {
		        var ban_reason = args.join(' ');
            }
		    if (ls === true) {
                if (!Use) {
                    message.channel.send('Please mention a user');
                } else {

                    const User = client.users.cache.get(Use.id);

                    const avatar = User.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });

                    const ban_embed = {
                        color: 0xd10700,
                        title: `${User.tag} Was Banned`,
                        thumbnail: {
                            url: avatar,
                        },
                        fields: [
                            {
                                name: 'Ban Reason',
                                value: `${ban_reason}`,
                                inline: true,
                            }
                        ],
                        timestamp: new Date()
                    };

                    client.channels.cache.get(mod_ch).send({ embed: ban_embed });

                    message.channel.send(`User ${User.tag} Has Been Banned`);

                    User.send(`${User.username}, You have been banned from ${server_name}\n\nReason : ${ban_reason}`);

                    Use.ban({reason: ban_reason});

                }
            } else {
            	message.channel.send('You Lack The Permissions To Use This Command');
            }
		} catch (error) {
			console.log(`[WARNING] : Problem Banning Member : ${error}`.yellow.bold);
		}
	},
};