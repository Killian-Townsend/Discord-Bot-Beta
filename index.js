//node modules
const fs = require('fs');
const Discord = require('discord.js');
const colors = require('colors');
const path = require('path');
//client
const client = new Discord.Client();


//functions and commands
client.commands = new Discord.Collection();
client.functions = new Discord.Collection();
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

var config = fileLoad();

client.once('ready', () => {
	
	try {

	    /*
	    Remember

	    config[0] = token
	    config[1] = prefix
	    config[2] = watchList
	    config[3] = cmdKill
	    config[4] = modCh
	    config[5] = cmdCh
	    config[6] = welcomeCh
	    config[7] = memberCntCh
	    config[8] = welcomeMsg

	    */

	    //loading message
		console.log('[SYS] Bot Loading...'.brightMagenta);

		//logs if the kill command is enabled, if value is an invalid value, it will default to false
		if (config[3] === 'true' || config[3] === 'false') {
		    //shows if set to true or false
		    console.log(`[SYS] Command Kill : ${config[3]}`.brightMagenta);
        } else {
            //sets to false if incorrect value
            console.log(`[WARNING] Incorrect Command Kill Value : ${config[3]} | Will set to false`.yellow.bold);
            //updating with new value
            fs.readFileSync("./config.txt", 'utf8', function (err,data) {

              var formatted = data.replace(/${config[3]}/g, 'false');

             fs.writeFileSync("./config.txt", formatted, 'utf8', function (err) {
                if (err) return console.log(err);
             });
            });
            //telling console
            console.log('[SYS] config.txt Updated!'.brightMagenta);
            console.log('[SYS] Reloading config.txt'.brightMagenta);
            //reloading config
            configLoad();
            console.log('[SYS] config.txt Reloaded'.brightMagenta);
            //tells final value
            console.log(`[SYS] Command Kill : ${config.cmdKill}`.brightMagenta);
        }

        //shows prefix set
		console.log(`[SYS] Prefix Set : ${config[1]}`.brightMagenta);

        //converting watchList string to an array
        var wl = config[2];
        var wl = wl.split('*');

		//watch variable setting
		if (wl.length > 0) {
		    //if custom watch message(s) has values, it'll choose a random one
		    var curWatch = Math.floor(Math.random() * wl.length);
            var watch = wl[curWatch];
		} else {
		    //else sets to ${config.prefix}help
		    var watch = `${config[1]}help`;
		}
		//sets bot watch to determined value
		client.user.setActivity(watch);
		//console shows what the watch variable is
		console.log(`[SYS] Bot Activity is : Playing A Game ${watch}`.brightMagenta);
		//console shows watch is set
		console.log('[SYS] Bot Activity Set'.brightMagenta);

        //shows what the command channel is set to, if not set, will show Not Set
		if (config[4]) {
		    console.log(`[SYS] modCh : ${config[4]}`.brightMagenta);
		} else {
		    console.log(`[SYS] modCh : Not Set`.brightMagenta);
		} 1

		//shows what the command channel is set to, if not set, will show Not Set
		if (config[5]) {
		    console.log(`[SYS] cmdCh : ${config[5]}`.brightMagenta);
		} else {
		    console.log(`[SYS] cmdCh : Not Set`.brightMagenta);
		}

		//shows what the command channel is set to, if not set, will show Not Set
        if (config[6]) {
        	console.log(`[SYS] welcomeCh : ${config[6]}`.brightMagenta);
        } else {
            console.log(`[SYS] welcomeCh : Not Set`.brightMagenta);
        }

        //shows what the command channel is set to, if not set, will show Not Set
        if (config[7]) {
        	console.log(`[SYS] memberCntCh : ${config[7]}`.brightMagenta);
        } else {
            console.log(`[SYS] memberCntCh : Not Set`.brightMagenta);
        }

        //shows if a welcome message is set
        if (config[8]) {
        	console.log(`[SYS] welcomeMsg Set : True`.brightMagenta);
        } else {
            console.log(`[SYS] welcomeMsg Set : False`.brightMagenta);
        }

		//console logs that the bot is ready
		console.log('[INFO] Bot Ready!'.brightGreen);
		//will send bot ready message in the mod channel if set
		if (!config[5] == undefined) {
		    client.channels.cache.get(config[5]).send('Bot Ready!');
		}
		//adds blank line to console to separate load messages from command logs
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
	    //runs user_join.js in the functions folder
        client.functions.get('user_join').execute(member, client, config);
	} catch (error) {
	    //catch any errors
		console.log(`[ERROR] An Error Occurred While Adding A Member : ${error}`.brightRed.bold);
	}
})

client.on("guildMemberRemove", member => {

	try {
	    //runs user_leave.js in the functions folder
		client.functions.get('user_leave').execute(member, client, config);
	} catch (error) {
	    //catch any errors
		console.log(`[ERROR] Member ${member.user.username} Leave Error : ${error}`.brightRed.bold);
	}
})

client.on('message', message => {
    var config = fileLoad();
    try {

	    if (config[7]) {
	        try {

                //the 8 is the amount of bots in my server
	            const members = client.guilds.cache.get(message.guild.id).memberCount - 8;
	            client.channels.cache.get(config[7]).setName(`Members : ${members}`);

	        } catch (error) {
	            //catch any errors
	        	console.log(`[ERROR] Member Update Error : ${error}`.red.bold);
	        }
	    }

        //if it doesn't start with the prefix or is a bot, ignore
	    if (!message.content.startsWith(config[1]) || message.author.bot) return;
	    //if the message is from a DM, ignore
	    if (message.channel.type === 'dm') return;
	    //if the bot command channel is not set or the message was sent in the correct channel, follow through
	    if (config[5] == undefined || message.channel.id === config[5]) {
            try {
                //slice up the message into an array
	    	    var args = message.content.slice(config[1].length).trim().split(/ +/);
	    	    //remove the prefix and make the first argument, the command, lowercase
		        var commandName = args.shift().toLowerCase();
                //gets command
                var command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));;
                if (!command) {
                    message.channel.send(`Unknown Command, Try Using ${config[1]}help`);
                } else {
                    //if the arguments required for the command aren't enough, let the user know
                    if (command.args && !args.length) {
                        let reply = 'Please add some arguments after the command';
                        if (command.usage) {
                            reply += `\nThe proper usage would be: \`${config[1]}${command.name} ${command.usage}\``;
                        }
                        return message.channel.send(reply);
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
		   	console.log(`[CMD] ${comSendForm}  |  Command Sent : ${command.name}`.brightCyan);

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

//functions
function fileLoad() {

    //this should enable editing settings
    //restarting the bot!

    //load config.txt
    try {
        //grabs file as a string
        var raw = fs.readFileSync("./config.txt", {"encoding": "utf-8"});
        //turns into array at the new lines
        var raw = raw.split("\n");
        //shifts 16 times to remove the comments
        for (let i = 0; i < 16; i++) {
            raw.shift();
        }
        //sets variable as the final array
        var config = raw;
        //returns the array
    } catch (error) {
        //catch any error in case something went wrong
        console.log(`[ERROR] Problem Loading config.txt: ${error}`.red);
    }

    //return the config array
    return config;
};

//log in to your bot
try {
    client.login(config[0]);
} catch (error) {
    process.stdout.write("[FATAL] Unknown or Invalid Bot Token!!!".black.bgBrightRed);
    process.exit();
}