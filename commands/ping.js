module.exports = {
	name: 'ping',
	description: 'Replies With Bot Latency',
	aliases: ['test', 'latency'],
	usage: ' ',
	cooldown: 5,
	execute(message, args) {

		message.channel.send(`\`\`Pinging\`\``).then(m =>{
			
			var ping = m.createdTimestamp - message.createdTimestamp;
			
			setTimeout(function(){m.edit(`\`\`Pinging\`\``) }, 500);
			setTimeout(function(){m.edit(`\`\`Pinging.\`\``) }, 1000);
			setTimeout(function(){m.edit(`\`\`Pinging..\`\``) }, 1500);
			setTimeout(function(){m.edit(`\`\`Pinging...\`\``) }, 2000);
			setTimeout(function(){m.edit(`\`\`Ping: ${ping}ms\`\``) }, 2500);
			
		});
		
	},
};