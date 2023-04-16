import { Guild, Member } from 'eris';
import { GuildManager } from '../managers/guild-manager';

export function onGuildMemberRemove(guild: Guild, member: Member, client: any) {
	let guildManager = new GuildManager();
	let guildInfo = guildManager.findGuild(guild.id);

	try {
		if (!guildInfo) throw Error();
		client.createMessage(
			guildInfo.logTarget,
			`<@${member.id}> has just left the server.`
		);
	} catch (e: any) {
		console.error(
			`${member.username}(${member.id}) has just left the server, but there was an issue sending a message to the specified channel because it was either never specified, does not exist or its ID is malformed.`
		);
	}
}
