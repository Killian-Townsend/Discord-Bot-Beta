module.exports = {
	name: 'kill',
	description: 'Terminates The Bot - Admin Only',
	aliases: ['end', 'stop'],
	execute(message, args, config) {
        if (message.member.hasPermission('ADMINISTRATOR')) {
		    if (config[3] === 'false') {
			    message.channel.send('Command Terminating Is Disabled');
		    }
		    else if (config[3] === 'true') {

			    message.channel.send('Terminating Bot...');
			    console.log('[SYS] Kill Command Sent, Terminating Bot...'.brightMagenta);
			    setTimeout(function(){
			    	process.exit();
			    }, 750);

		    }
        }
	},
};