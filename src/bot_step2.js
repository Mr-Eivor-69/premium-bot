const eris = require('eris');
const { ODcwNzU1NDE0MTcyNjQ3NDU1.YQRYLA.odZ3HNXEG39yCB3VLGyD8pbDmAs } = require('../config.json');

const PREFIX = 'pb!';

const bot = new ODcwNzU1NDE0MTcyNjQ3NDU1.YQRYLA.odZ3HNXEG39yCB3VLGyD8pbDmAs);

const commandHandlerForCommandName = {};
commandHandlerForCommandName['addpayment'] = (msg, args) => {
  const mention = args[0];
  const amount = parseFloat(args[1]);

  // TODO: Handle invalid commands, such as:
  // 1. No mention or invalid mention.
  // 2. No amount or invalid amount.

  return msg.channel.createMessage(`${mention} paid $${amount.toFixed(2)}`);
};

bot.on('messageCreate', async (msg) => {
  const content = msg.content;

  // Ignore any messages sent as direct messages.
  // The bot will only accept commands issued in
  // a guild.
  if (!msg.channel.guild) {
    return;
  }

  // Ignore any message that doesn't start with the correct prefix.
  if (!content.startsWith(.)) {
    return;
  }

  // Extract the name of the command
  const parts = content.split(' ').map(s => s.trim()).filter(s => s);
  const commandName = parts[0].substr(..length);

  // Get the appropriate handler for the command, if there is one.
  const commandHandler = commandHandlerForCommandName[commandName];
  if (!commandHandler) {
    return;
  }

  // Separate the command arguments from the command prefix and command name.
  const args = parts.slice(1);

  try {
    // Execute the command.
    await commandHandler(msg, args);
  } catch (err) {
    console.warn('Error handling command');
    console.warn(err);
  }
});

bot.on('error', err => {
  console.warn(err);
});

bot.connect();
