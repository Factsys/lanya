module.exports = {
  name: 'mess',
  description: 'DMs a user a message. Only for staff.',
  run: async (client, message, args) => {
    if (!message.member.permissions.has('ManageMessages')) {
      return message.reply("You don't have permission to use this.");
    }

    const member = message.mentions.members.first();
    if (!member) return message.reply('Mention a valid user.');

    const msg = args.slice(1).join(' ');
    if (!msg) return message.reply('You must provide a message.');

    try {
      await member.send(msg);
      message.reply('Message sent.');
    } catch {
      message.reply('Could not DM the user.');
    }
  }
};
