module.exports = {
	name: 'member_update',
	execute(config, guild) {
        try {
            if(config.memberCountChannel) {
	            client.channels.cache.get(config.memberCountChannel).setName(`Members: ${guild.memberCount}`);
	        }
        } catch (error) {
	        //catch any errors
	        console.log(`[ERROR] Member Update Error in Server ${guild.name}: ${error}`.red.bold);
	    }
	}
};