module.exports = {
	name: 'guild_leave',
	execute(guild, client, memDataChk) {
        try {
            const fs = require('fs');
            var defConfig = '{\n    "version": "2",\n   "prefix": "~",\n    "logEvent": ["MEMBER_JOIN", "MEMBER_LEAVE", "MEMBER_KICKED", "MEMBER_BANNED"],\n    "disabledCommands": "",\n    "commandChannel": "",\n    "MemberCountChannel": "",\n    "modChannel": "",\n    "bannedWords": ""\n}';
            var dir = `./data/servers/${guild.id}`;
            if(!fs.existsSync(`./data/servers/${guild.id}`)) {
                fs.mkdirSync(`./data/servers/${guild.id}`);
                fs.mkdirSync(`./data/servers/${guild.id}/users`);
                fs.writeFileSync(`./data/servers/${guild.id}/config.json`, defConfig);
                guild.members.cache.forEach(member => {
                    var defMem = '{\n   "version": "2",\n   "warns": "0",\n    "mutes": "0",\n    "kicks": "0",\n}';
                    fs.writeFileSync(`./data/servers/${guild.id}/users/${member.user.id}.json`, defMem);
                });
            }
            if(memDataChk === true) {
                guild.members.cache.forEach(member => {
                    var defMem = '{\n   "version": "2",\n    "cash": "100",\n    "dailyTime": ""\n}';
                    if(!fs.existsSync(`./data/users/${member.user.id}.json`)){
                        fs.writeFileSync(`./data/users/${member.user.id}.json`, defMem);
                    }
                });
            }
            console.log(`[SYS] Files Written For Guild - Name: ${guild.name} | ID: ${guild.id}`.brightMagenta);
        } catch(error) {
            console.log(`[ERROR] Problem Writing Guild Files for ${guild.name}: ${error}`.brightRed.bold);
        }
	}
};
