module.exports = {
	name: 'opt',
	aliases: ['settings', 'set', 'options'],
	description: 'Set or see bot settings',
	execute(message, args, config) {
        //need this to write file
        const fs = require('fs');

	    try {
            if(!args[0]) {

                setRply();

            } else {

                //only allows admins to change bot settings
                if (message.member.hasPermission('ADMINISTRATOR')) {

                    //sets values as a variable, can be changed in the if statements
                    //these value will be written after the if statements
                    var prefix = config[1];
                    var modCh = config[4];
                    var welcomeCh = config[6];
                    var cmdCh = config[5];
                    var memberCntCh = config[7];
                    var watchList = config[2];

                    //if statements
                    if(args[0] === 'prefix') {

                        //checks if args[2] is set
                        if(args[1]) {
                            //set prefix var to second argument
                            var prefix = args[1];
                            if(prefix.length <= 8) {
                            console.log(`[SYS] Updated prefix : ${args[1]}`.brightMagenta);
                            message.channel.send(`Updated Prefix to ${args[1]}`);
                            } else {
                                message.channel.send('Invalid prefix! Your prefix must be 8 characters or less.');
                                return;
                            }
                        } else {
                            setRply();
                            return;
                        }
                    }
                    else if(args[0] === 'modCh') {

                        //send if second argument is given
                        if(args[1]){
                            //bot will check if ID is 18 characters and only comprised of only numbers
                            if(args[1].length === 18 && /\D/.test(args[1]) === false) {
                                //will set if valid ID
                                console.log(`[SYS] Updated modCh : ${args[1]}`.brightMagenta);
                                message.channel.send(`Updated Mod Channel to ${args[1]}`);
                                var modCh = args[1];
                            } else {
                                message.channel.send('That is not a valid channel ID');
                                return;
                            }
                        } else {
                            setRply();
                            return;
                        }

                    }
                    else if(args[0] === 'welcomeCh') {

                        //send if second argument is given
                        if(args[1]){
                            //bot will check if ID is 18 characters and only comprised of only numbers
                            if(args[1].length === 18 && /\D/.test(args[1]) === false) {
                                //will set if valid ID
                                console.log(`[SYS] Updated welcomeCh : ${args[1]}`.brightMagenta);
                                message.channel.send(`Updated Welcome Channel to ${args[1]}`);
                                var welcomeCh = args[1];
                            } else {
                                message.channel.send('That is not a valid channel ID');
                                return;
                            }
                        } else {
                            setRply();
                            return;
                        }

                    }
                    else if(args[0] === 'cmdCh') {

                        //send if second argument is given
                        if(args[1]){
                            //bot will check if ID is 18 characters and only comprised of only numbers
                            if(args[1].length === 18 && /\D/.test(args[1]) === false) {
                                //will set if valid ID
                                console.log(`[SYS] Updated cmdCh : ${args[1]}`.brightMagenta);
                                message.channel.send(`Updated Command Channel to ${args[1]}`);
                                var cmdCh = args[1];
                            } else {
                                message.channel.send('That is not a valid channel ID');
                                return;
                            }
                        } else {
                            setRply();
                            return;
                        }

                    }
                    else if(args[0] === 'memberCntCh') {

                        //send if second argument is given
                        if(args[1]){
                            //bot will check if ID is 18 characters and only comprised of only numbers
                            if(args[1].length === 18 && /\D/.test(args[1]) === false) {
                                //will set if valid ID
                                console.log(`[SYS] Updated memberCntCh : ${args[1]}`.brightMagenta);
                                message.channel.send(`Updated Member Count Channel to ${args[1]}`);
                                var memberCntCh = args[1];
                            } else {
                                message.channel.send('That is not a valid channel ID');
                                return;
                            }
                        } else {
                            setRply();
                            return;
                        }

                    }
                    else if(args[0] === 'watchList') {

                        //send if second argument is given
                        if(args[1]){
                            //if adding a value
                            if(args[2] === 'add') {

                                //removes the first two arguments
                                args.shift();
                                args.shift();

                                //turns remaining arguments into a string
                                var str = args.join(' ');

                                //checks if string is too long
                                if(srt.length <= 128) {

                                    var watchList = watchList + '*' + str;
                                    console.log(`[SYS] Updated watchList : added ${str}`.brightMagenta);
                                    message.channel.send(`Added status message`);

                                } else {
                                    //tell user if string given is too long
                                    message.channel.send(`Invalid string! The maximum status message size is 128 characters. Your string was ${str.length - 128} characters too long.`);
                                    return;
                                }
                            }
                            //if removing a value
                            else if(args[2] === 'rem'){

                                var watchList = watchList.split('*');
                                var watchList = watchList.splice(args[3],1);
                                var watchList = watchList.join('*');

                                console.log(`[SYS] Updated watchList : removed at index ${args[3]}`.brightMagenta);
                                message.channel.send(`Removed status message at index ${args[3]}`);

                            }
                            //if the argument is neither of those values
                            else {
                                setRply();
                                return;
                            }
                        } else {
                            setRply();
                            return;
                        }

                    }
                    else {
                        setRply();
                        return;
                    }

                    //write values to config.txt

                    //add comments to the top of the file
                    let setWrite = `# This is the config file\n# Only modify the values under these comments\n# Separate watch watchList values with *\n# Order of values\n#\n# token\n# prefix\n# watchList\n# cmdKill\n# ops\n# modCh\n# cmdCh\n# welcomeCh\n# memberCntCh\n# welcomeMsg\n#`;
                    //added all of the settings after
                    setWrite += `\n${config[0]}`
                    setWrite += `\n${prefix}`
                    setWrite += `\n${watchList}`
                    setWrite += `\n${config[3]}`
                    setWrite += `\n${modCh}`
                    setWrite += `\n${cmdCh}`
                    setWrite += `\n${welcomeCh}`
                    setWrite += `\n${memberCntCh}`
                    setWrite += `\n${config[8]}`

                    //writing the file
                    fs.writeFile('./config.txt', setWrite, function (err) {
                        if (err) {
                            console.log(`[ERROR] Error Writing To config.txt : ${err}`.red.bold);
                        }
                    });

                } else {
                    setRply();
                }
            }

            //function to reply with settings, sent if command has no args or if the setting given has no args
            function setRply(){
                let reply = `***Force Utilities Settings***`;
                reply += `\nPrefix : ${config[1]}`;
                reply += `\nMod Ch : ${config[4]}`;
                reply += `\nWelcome Ch : ${config[6]}`;
                reply += `\nCMD Ch : ${config[5]}`;
                reply += `\nMember Count Ch : ${config[7]}`;
                reply += `\nWatch List : \n${config[2]}`;

                message.channel.send(reply);
            }
        } catch (error) {
	        console.log(`[ERROR] Option Error : ${error}`.red.bold);
        }
	},
};