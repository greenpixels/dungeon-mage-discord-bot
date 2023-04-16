import { CommandMap } from './command-map';
import { onGuildMemberRemove } from './webhooks/on-guild-member-remove';
import { Guild, Member, Message } from 'eris';
const config: {
	token: string;
	invoke: string;
} = require('../bot.config.json');

const Eris = require('eris');
const client = new Eris(config.token, {
	intents: ['guildMembers', ['allNonPrivileged']],
});

client.on('ready', () => console.log('Ready!'));

client.on('guildMemberRemove', (guild: Guild, member: Member) =>
	onGuildMemberRemove(guild, member, client)
);

client.on('guildBanAdd', () => console.log('A member has been banned.'));

client.on('messageCreate', (message: Message) => {
	let { content, channel, author } = message;
	if (author.bot) return;

	let command = content.split(' ')[0];
	if (command.charAt(0) !== config.invoke) return;
	command = command.replace(config.invoke, '');
	// Remove the command-word from the message
	let words = content.split(' ');
	words.shift();
	content = words.join(' ');

	if (command in CommandMap) {
		CommandMap[command]({ content, channel, author, message, client });
	} else {
		console.warn(`Command ${command} was not found in command map`);
	}
});

client.connect();
