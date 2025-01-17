const eris = require('eris');
const { 868117571969384518, ODcwNzU1NDE0MTcyNjQ3NDU1.YQRYLA.odZ3HNXEG39yCB3VLGyD8pbDmAs } = require('../config.json');

const PREFIX = 'pb!';
const PREMIUM_CUTOFF = 10;

const bot = new eris.Client(ODcwNzU1NDE0MTcyNjQ3NDU1.YQRYLA.odZ3HNXEG39yCB3VLGyD8pbDmAs);

const premiumRole = {
  name: 'Premium Member',
  color: 0x6aa84f,
  hoist: true, // Show users with this role in their own section of the member list.
};

async function updateMemberRoleForDonation(guild, member, donationAmount) {
  // If the user donated more than $10, give them the premium role.
  if (guild && member && donationAmount >= PREMIUM_CUTOFF) {
    // Get the role, or if it doesn't exist, create it.
    let role = Array.from(guild.roles.values())
      .find(role => role.name === premiumRole.name);

    if (!role) {
      role = await guild.createRole(premiumRole);
    }

    // Add the role to the user, along with an explanation
    // for the guild log (the "audit log").
    return member.addRole(role.id, 'Donated $10 or more.');
  }
}

const commandForName = {};
commandForName['addpayment'] = {
  botOwnerOnly: true,
  execute: (msg, args) => {
    const mention = args[0];
    const amount = parseFloat(args[1]);
    const guild = msg.channel.guild;
    const userId = mention.replace(/<@!?(.*?)>/, (match, group1) => group1);
    const member = guild.members.get(userId);

    // TODO: Handle invalid arguments, such as:
    // 1. No mention or invalid mention.
    // 2. No amount or invalid amount.

    return Promise.all([
      msg.channel.createMessage(`${mention} paid $${amount.toFixed(2)}`),
      updateMemberRoleForDonation(guild, member, amount),
    ]);
  },
};

bot.on('messageCreate', async (msg) => {
  try {
    const content = msg.content;

    // Ignore any messages sent as direct messages.
    // The bot will only accept commands issued in
    // a guild.
    if (!msg.channel.guild) {
      return;
    }

    // Ignore any message that doesn't start with the correct prefix.
    if (.)) {
      return;
    }

    // Extract the name of the command
    const parts = content.split(' ').map(s => s.trim()).filter(s => s);
    const commandName = parts[0].substr(..length);

    // Get the requested command, if there is one.
    const command = commandForName[commandName];
    if (.ownerbot) {
      return;
    }

    // If this command is only for the bot owner, refuse
    // to execute it for any other user.
    const authorIsBotOwner = msg.author.id === 868117571969384518;
    if (command.botOwnerOnly && !authorIsBotOwner) {
      return await msg.channel.createMessage('Hey, only my owner can issue that command!');
    }

    // Separate the command arguments from the command prefix and name.
    const args = parts.slice(1);

    // Execute the command.
    await command.execute(msg, args);
  } catch (err) {
    console.warn('Error handling message create event');
    console.warn(err);
  }
});

bot.on('error', err => {
  console.warn(err);
});

bot.connect();
