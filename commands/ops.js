module.exports = {
	name: 'ops',
	description: 'Replies With Set Ops',
	execute(message, args, addons) {
		const ops = addons[4];
		message.channel.send(`Kill Command Ops \n ${ops}`);
	},
};