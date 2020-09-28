module.exports = {
	name: 'play',
	aliases: ['status'],
	description: 'Change the playing message',
	execute(message, args, config, client) {

        //converting watchList string to an array
        var wl = config[2];
        var wl = wl.split('*');

		if(!args[0]) {
			const curWatch = Math.floor(Math.random() * wl.length);
			const watch = wl[curWatch];
			client.user.setActivity(watch);
			message.channel.send(`Bot Activity is : Playing A Game ${watch}`);
		}
		else if ((args[0] > -1) && (args[0] < wl.length)) {
			const watch = wl[args[0]];
			client.user.setActivity(watch);
			message.channel.send(`Bot Activity is : Playing A Game ${watch}`);
		}
		else {
			message.channel.send(`${args[0]} is an invalid argument, it must be a digit from 0 to ${wl.length - 1}, or no arguments for a random selection`);
		}
	},
};