module.exports = {
	name: 'help',
	description: 'A Nice Help Menu',
	aliases: ['commands'],
	usage: '<commandName>',
	cooldown: 5,
	execute(message, args, config, client) {

        var commands = client.commands;
        var data = [];

        if(!args.length) {

		    data.push(`***${message.guild.name}***\n`);
            data.push(commands.map(command => command.name).join('\n'));
            data.push(`\nYou can send \`${config[1]}help <command name>\` to get info on a specific command!`);

            message.channel.send(data);
        }
    },
};