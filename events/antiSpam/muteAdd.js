const { MessageEmbed } = require('discord.js');
const { stripIndents } = require("common-tags");

module.exports = (client, member) => {
    const logChannel = member.guild.channels.cache.find(c => c.name === "mod-logs");
    if (logChannel) {
        const embed = new MessageEmbed()
            .setColor("#ff0000")
            .setTitle("User Muted")
            .setThumbnail(member.guild.me.user.displayAvatarURL())
            .setFooter(member.guild.me.displayName, member.guild.me.user.displayAvatarURL())
            .setTimestamp()
            .setDescription(stripIndents`
            **Muted member:** ${member} (${member.id})
            **Muted by:** ${member.guild.me}
            **Reason:** Spam`)

        logChannel.send(embed);
    }
    let muterole = member.guild.roles.cache.find(r => r.name === "Muted")
    setTimeout(() => {
        if (!member.roles.cache.some(role => role.name === "Muted")) {
            member.roles.remove(muterole.id);
            const embed2 = new MessageEmbed()
                .setColor("#00ff00")
                .setTitle("User Unmuted")
                .setThumbnail(member.guild.me.user.displayAvatarURL())
                .setFooter(member.guild.me.displayName, member.guild.me.user.displayAvatarURL())
                .setTimestamp()
                .setDescription(stripIndents`
                **Unmuted member:** ${member} (${member.id})
                **Unmuted by:** ${member.guild.me}
                **Reason:** 5 Minute mute expired`)
            if (logChannel) logChannel.send(embed2);
        }
    }, 300000)
}