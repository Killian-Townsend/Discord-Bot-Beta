module.exports = {
	name: 'warcrime',
	description: 'commit a war crime',
	args: true,
	usage: '<something of your choice>',
	execute(message, args) {
		const place = args.join(' ');
		message.channel.send(`${message.author.username} committed a war crime on ${place}`);
	},
};