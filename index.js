//node modules
const fs = require('fs');
const Discord = require('discord.js');
const colors = require('colors');
const path = require('path');
const strings = require('./values/strings.json');
//client
const client = new Discord.Client();

console.log(colors.brightMagenta("[SYS] Starting..."));
//functions and commands
try{
  if(fs.existsSync("./functions/inter/checkFiles.js")){
    let chkDir = require('./functions/inter/checkFiles.js');
    //
    if(process.argv[2] === "rehash"){
      chkDir.rehash(chkDir);
    }
    // Check Files and Hashes
    let res = chkDir.check(chkDir);
    
    if(res.length > 0){
      if(res[0] === 1){
        console.log(colors.bold.brightRed(`[ERROR] Some Files/Directories  Could Not Be Located:${res[1]}`));
      }else if(res[0] === 2){
        console.log(colors.bold.brightRed(`[ERROR] Some  File Hashes Returned Invalid${res[1]}`));
      }
      process.exit();
    }
    
  }else{
    console.log(colors.bold.white.bgBrightRed("[FATAL] Missing File Check Script"));
    process.exit();
  }
}catch(e){
  console.log(colors.bold.white.bgBrightRed(`[FATAL] File Check Script Error | ${e.name}: ${e.message}`));
}

const botConfig = require("./botConfig.json");
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
const cooldowns = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
for (const file of eventFiles) {
	const events = require(`./events/${file}`);
	client.functions.set(events.name, events);
}

if(botConfig.token === undefined || botConfig.token.split(" ").length > 1){
  console.log(colors.bold.white.bgBrightRed("[FATAL] Invalid Bot Token"));
  process.exit();
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
		console.log('‎‎‎‎‎‎‎‎‏‏‎‎‎‏‎‎‎‏‎‎‎‏‏'.black);
    
    /*--CLEAR-THIS-BEFORE-RELEASE--*/
    console.log(colors.brightMagenta("[SYS] Exiting"));
    setTimeout(function(){process.exit()}, 500);
    /*-----------------------------*/
	} catch (error) {
		console.log(`[FATAL] Loading Error : ${error}`.black.bgBrightRed);
    process.exit();
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
        if(fs.existsSync(`./data/servers/${message.guild.id}/config.json`)==true) {
            var defConfig = `
`;
            fs.writeFileSync(`./data/servers/${message.guild.id}/config.json`, JSON.stringify(defConfig,null,2));
            console.log(colors.brightMagenta(`[SYS] Config Written For Guild: ${guild.id} | ${guild.name}`));
        }
        //sets server config

	    var config = require(`./data/servers/${message.guild.id}/config.json`);

        //if any of these return true, ignore lol
	    if (!message.content.startsWith(config.prefix) || message.author.bot || message.channel.type === 'dm') return;
		
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
		  console.log(`[ERROR] Command Logging Error : ${error}`.brightRed.bold);
		}
  } catch (error) {
        console.log(`[WARNING] Command Error : ${error}`.yellow.bold);
  }
});

client.login(botConfig.token);
