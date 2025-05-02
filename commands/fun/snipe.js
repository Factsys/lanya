const { EmbedBuilder } = require('discord.js');
const Snipes = new Map();

module.exports = {
  name: 'snipe',
  description: 'Shows the last deleted messages.',
  aliases: ['s'],
  run: async (client, message, args) => {
    const snipes = Snipes.get(message.channel.id) || [];
    const page = Math.max(1, Math.min(parseInt(args[0]) || 1, snipes.length));
    const snipe = snipes[page - 1];

    if (!snipe) {
      return message.channel.send('No messages to snipe.');
    }

    const embed = new EmbedBuilder()
      .setAuthor({ name: snipe.author, iconURL: snipe.avatar })
      .setDescription(snipe.content || '*[no content]*')
      .setFooter({ text: `Page ${page}/${snipes.length}` })
      .setTimestamp(snipe.time)
      .setColor(0x7289DA);

    message.channel.send({ embeds: [embed] });
  }
};
