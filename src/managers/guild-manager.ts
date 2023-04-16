import { readFileSync } from 'fs';
import { writeFileSync } from 'fs';

type GuildInfo = {
	id: string;
	logTarget: string;
};

const guilds_file_path = './guilds/guilds.json';

export class GuildManager {
	public getGuilds(): { [key: string]: GuildInfo } {
		try {
			return JSON.parse(readFileSync(guilds_file_path, { encoding: 'utf-8' }));
		} catch (e: any) {
			console.error('Could not parse guilds.json');
			console.log(e);
			return {};
		}
	}

	public findGuild(id: string | undefined) {
		let guilds = this.getGuilds();
		let guild = guilds[id];
		return guild;
	}

	public saveGuild(info: GuildInfo) {
		let guilds = this.getGuilds();
		guilds[info.id] = info;
		try {
			writeFileSync(guilds_file_path, JSON.stringify(guilds));
		} catch (e: any) {
			console.error('Could not save to guilds.json');
			console.log(e);
		}
	}
}
