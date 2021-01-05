module.exports = {
	name: 'reload',
	description: 'Reload commands or the config',
	usage: '<any command or config>',
	cooldown: 5,
	execute(message, args, config) {
	    if (message.member.hasPermission('ADMINISTRATOR')) {
            if (!args.length) return message.channel.send(`You didn't pass any command to reload, ${message.author}!`);
            const commandName = args[0].toLowerCase();
            const command = message.client.commands.get(commandName)
            	|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
            if (!command) return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);

            try {


            } catch (error) {

                
            }
        }
	},
};