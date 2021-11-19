const { s } = require('../../functions.js');
const { MessageEmbed } = require("discord.js");

module.exports = async (client, guild, user) => {
    if (user.id !== client.user.id) {
        if (guild.channels) {
            let logChannel = await guild.channels.cache.find(c => c.name.includes("mod-logs")) || undefined;

            if (logChannel) {
                const embed = new MessageEmbed()
                    .setColor("#0efefe")
                    .setTitle("Member Banned")
                    .setThumbnail(user.displayAvatarURL())
                    .setDescription(`${user} ${user.tag}`)
                    .setFooter(`ID: ${user.id}`)
                    .setTimestamp()

                return s(logChannel, '', embed).catch(err => err);
            }
        }
    }
}
