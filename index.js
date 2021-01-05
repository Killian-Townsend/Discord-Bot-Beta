//node modules
const fs = require('fs');
const Discord = require('discord.js');
const colors = require('colors');
const path = require('path');


//client
const client = new Discord.Client();


//functions and commands
const botConfig = require("./botConfig.json");
client.commands = new Discord.Collection();
client.functions = new Discord.Collection();
const cooldowns = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const functionFiles = fs.readdirSync('./functions').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
for (const file of functionFiles) {
	const functions = require(`./functions/${file}`);
	client.functions.set(functions.name, functions);
}

client.once('ready', () => {

    try {

	    //loading message
			console.log('[SYS] Bot Loading...'.brightMagenta);

        //watching
        client.user.setStatus('idle');
        let memCnt = 0;
        try {
            client.guilds.cache.forEach(g => {
                memCnt = memCnt + g.memberCount;
            });
        } catch(error) {
            console.log(error);
        }
        var watch = `${memCnt} users in ${client.guilds.cache.size} servers!`;
		client.user.setActivity(watch, { type: 'WATCHING' });
		console.log(`[SYS] Bot Activity is : Playing A Game ${watch}`.brightMagenta);
		console.log('[SYS] Bot Activity Set'.brightMagenta);

		//console logs that the bot is ready
		console.log('[INFO] Bot Ready!'.brightGreen);
        //add blank line
		console.log('‎‎‎‎‎‎‎‎‏‏‎            ‎‏'.black);

	} catch (error) {

	    //if anything went wrong with bot loading, it will show an error and not load
	    //this is because something going wrong above will most likely break the bot

	    //shows the error
		console.log(`[FATAL] Loading Error : ${error}`.black.bgBrightRed);
		//starts auto kill function
		process.stdout.write("[FATAL] Bot Will Not Load And Will Close In 5 Seconds".black.bgBrightRed);
            setTimeout(function(){
                process.stdout.clearLine();
                process.stdout.cursorTo(0);
                process.stdout.write("[FATAL] Bot Will Not Load And Will Close In 4 Seconds".black.bgBrightRed);
            }, 1000);
            setTimeout(function(){
                process.stdout.clearLine();
                process.stdout.cursorTo(0);
                process.stdout.write("[FATAL] Bot Will Not Load And Will Close In 3 Seconds".black.bgBrightRed);
            }, 2000);
            setTimeout(function(){
                process.stdout.clearLine();
                process.stdout.cursorTo(0);
                process.stdout.write("[FATAL] Bot Will Not Load And Will Close In 2 Seconds".black.bgBrightRed);
            }, 3000);
            setTimeout(function(){
                process.stdout.clearLine();
                process.stdout.cursorTo(0);
                process.stdout.write("[FATAL] Bot Will Not Load And Will Close In 1 Seconds".black.bgBrightRed);
            }, 4000);
            setTimeout(function(){
                process.stdout.clearLine();
                 process.stdout.cursorTo(0);
                 process.stdout.write("[FATAL] Bot Will Not Load And Has Closed".black.bgBrightRed);
                 process.exit();
            }, 5000);

	}

});

client.on ("guildMemberAdd", member => {

	try {

        if(!fs.existsSync(`./data/servers/${member.guild.id}/config.json`)) {
            var defConfig = '{\n    "version": "2",\n   "prefix": "~",\n    "logEvent": ["MEMBER_JOIN", "MEMBER_LEAVE", "MEMBER_KICKED", "MEMBER_BANNED"],\n    "disabledCommands": "",\n    "commandChannel": "",\n    "MemberCountChannel": ""\n    "modChannel": ""\n    "bannedWords": ""\n    "welcomeChannel": ""\n}';
            fs.writeFileSync(`./data/servers/${member.guild.id}/config.json`, defConfig);
            console.log(`[SYS] Config Written For Guild - Name: ${member.guild.name} | ID: ${member.guild.id}`.brightMagenta);
        }

        //sets server config
	    var config = require(`./data/servers/${member.guild.id}/config.json`);

	    //runs user_join.js in the functions folder
        client.functions.get('user_join').execute(member, client, config);

	} catch (error) {
	    //catch any errors
		console.log(`[ERROR] An Error Occurred While Adding A Member : ${error}`.brightRed.bold);
	}
})

client.on("guildMemberRemove", member => {

	try {

        if(!fs.existsSync(`./data/servers/${member.guild.id}/config.json`)) {
            var defConfig = '{\n    "version": "2",\n   "prefix": "~",\n    "logEvent": ["MEMBER_JOIN", "MEMBER_LEAVE", "MEMBER_KICKED", "MEMBER_BANNED"],\n    "disabledCommands": "",\n    "commandChannel": "",\n    "MemberCountChannel": ""\n    "modChannel": ""\n    "bannedWords": ""\n    "welcomeChannel": ""\n}';
            fs.writeFileSync(`./data/servers/${member.guild.id}/config.json`, defConfig);
            console.log(`[SYS] Config Written For Guild - Name: ${member.guild.name} | ID: ${member.guild.id}`.brightMagenta);
        }

        //sets server config
	    var config = require(`./data/servers/${member.guild.id}/config.json`);

	    //runs user_leave.js in the functions folder
		client.functions.get('user_leave').execute(member, client, config);

	} catch (error) {
	    //catch any errors
		console.log(`[ERROR] Member ${member.user.username} Leave Error : ${error}`.brightRed.bold);
	}
})

client.on("guildCreate", (guild) => {
    // This event triggers when the bot joins a guild.
		console.log(`Joined new guild: ${guild.name}`);
    client.functions.get('guild_join').execute(guild, client);
});

client.on("guildDelete", (guild) => {
    // This event triggers when the bot leaves a guild.
    console.log(`Left guild: ${guild.name}`);
});

client.on('message', message => {

    try {

        //checks if files exist
        if(!fs.existsSync(`./data/servers/${message.guild.id}/config.json`)) {
            var defConfig = '{\n    "version": "2",\n   "prefix": "~",\n    "logEvent": ["MEMBER_JOIN", "MEMBER_LEAVE", "MEMBER_KICKED", "MEMBER_BANNED"],\n    "disabledCommands": "",\n    "commandChannel": "",\n    "MemberCountChannel": ""\n    "modChannel": ""\n    "bannedWords": ""\n    "welcomeChannel": ""\n}';
            fs.writeFileSync(`./data/servers/${message.guild.id}/config.json`, defConfig);
            console.log(`[SYS] Config Written For Guild - Name: ${guild.name} | ID: ${guild.id}`.brightMagenta);
        }
        //sets server config

	    var config = require(`./data/servers/${message.guild.id}/config.json`);

        //if it doesn't start with the prefix or is a bot, ignore
	    if (!message.content.startsWith(config.prefix) || message.author.bot) return;
	    //if the message is from a DM, ignore
	    if (message.channel.type === 'dm') return;
	    //accepts commands if sent in command channel if send, mod channel, or if the sender has admin or manage server permissions
	    if (config.commandChannel == undefined || message.channel.id === config.commandChannel || message.channel.id === config.modChannel || message.member.hasPermission('ADMINISTRATOR') || message.member.hasPermission('MANAGE_GUILD')) {
            try {
                //slice up the message into an array
	            var args = message.content.slice(config.prefix.length).trim().split(/ +/);
	            //remove the prefix and make the first argument, the command, lowercase
		        var commandName = args.shift().toLowerCase();
                //gets command
                var command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));;
                //check if the given command is valid
                if (!command) {
                    message.channel.send(`Unknown Command, Try Using ${config.prefix}help`);
                } else if(config.disabledCommands.includes(command.name)) {
                    message.channel.send('Sorry! That command has been disable in this server!');
                } else {
                    //if the arguments required for the command aren't enough, let the user know
                    if (command.args && !args.length) {
                        let reply = 'Please add some arguments after the command';
                        if (command.usage) {
                            reply += `\nThe proper usage would be: \`${config.prefix}${command.name} ${command.usage}\``;
                        }
                        return message.channel.send(reply);
                    }
                    //cooldown system
                    if (!cooldowns.has(command.name)) {
                    	cooldowns.set(command.name, new Discord.Collection());
                    }
                    const now = Date.now();
                    const timestamps = cooldowns.get(command.name);
                    const cooldownAmount = (command.cooldown || 3) * 1000;
                    if (timestamps.has(message.author.id)) {
                    	const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
                    	if (now < expirationTime) {
                    		const timeLeft = (expirationTime - now) / 1000;
                    		return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
                    	}
                    } else {
                        timestamps.set(message.author.id, now);
                        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
                    }

                    //executes whatever command was given
                    try {
                        command.execute(message, args, config, client);
                    } catch (error) {
                        console.log(`[WARNING] Command Error : ${error}`.yellow.bold);
                    }

                }
		    } catch (error) {
		    	//this will happen if the command given is not a command in the commands folder
		    	console.log(`[WARNING] Command Error : ${error}`.yellow.bold);
		    }
		}
        try {
		    //logs the command and when it was sent in the console
			var now = Date.now();
		    var dateObj = new Date(now);
		    var hours = dateObj.getUTCHours() - 4;
		    var minutes = dateObj.getUTCMinutes();
		    var seconds = dateObj.getUTCSeconds();
		    //turns the different times into one string
		    var comSendForm = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
		    //puts the time and command together and outputs it in the console
		    if(!command){
		        console.log(`[CMD] ${comSendForm}  |  Command Sent : ${commandName}`.brightCyan);
		    } else {
		   	    console.log(`[CMD] ${comSendForm}  |  Command Sent : ${command.name}`.brightCyan);
		   	}
		} catch (error) {
		    //in case something is wrong with the command logging
		    console.log(`[ERROR] Command Logging Error : ${error}`.brightRed.bold);
		}
    } catch (error) {
        //never had this go off, but in case something is wrong in the entire on message function
        //but the other try statements will catch those errors
        //still better to be safe than sorry
        console.log(`[WARNING] Command Error : ${error}`.yellow.bold);
    }
});

client.login(botConfig.token);
