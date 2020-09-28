module.exports = {
	name: 'role',
	description: 'Adds Role To User',
	execute(message, args, addons) {
		console.log('s');
		const ops = addons[4];
		console.log('s');

		const ls = ops.includes(message.author.tag);
		
		console.log('s');
		if (ls === true) {
			console.log('s');
			if (args[0] == undefined) {
				channel.message.send('No user specified');
			} else if (args[1] == undefined) {
				channel.message.send('No role specified');
			} else {
				console.log('s');		
				const use = args[0];
				console.log('s');
				console.log(use);
				const uses = use.tag
				console.log(use);
				console.log('s');
				console.log(user);
				console.log('s');
				const role = message.guild.roles.find(role => role.name === args[1]);
				user.addRole(role);	
			}
		}
	},
};