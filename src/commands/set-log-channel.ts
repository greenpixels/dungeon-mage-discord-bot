import { CommandProps } from '../command-map';
import { GuildManager } from '../managers/guild-manager';

export function setLogChannel(options: CommandProps) {
	if (
		options.author.id !==
		options.client.guilds.get(options.message.guildID).ownerID
	) {
		options.client.createMessage(
			options.channel.id,
			'Only the server owner may use this command.'
		);
	}
	let guildManager = new GuildManager();
	let guild = guildManager.findGuild(options.message.guildID);
	if (guild) {
		guild.logTarget = options.channel.id;
	} else {
		guild = {
			id: options.message.guildID,
			logTarget: options.channel.id,
		};
	}
	options.client.createMessage(
		options.channel.id,
		'Log Messages will be sent here now!'
	);
	guildManager.saveGuild(guild);
}
