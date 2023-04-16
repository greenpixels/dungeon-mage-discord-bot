import Eris, { Message, TextableChannel, User } from 'eris';
import { setLogChannel } from './commands/set-log-channel';

export type CommandProps = {
	content: string;
	channel: TextableChannel;
	author: User;
	message: Message;
	client: Eris.Client;
};

export const CommandMap: { [command: string]: (options: CommandProps) => any } =
	{
		['log']: setLogChannel,
	};
