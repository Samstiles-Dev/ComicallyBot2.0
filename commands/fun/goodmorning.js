const { getMember } = require("../../functions.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "goodmorning",
    aliases: ["gm"],
    category: "fun",
    description: "Sends a cute goodmorning message.",
    permissions: "member",
    usage: "[Give a goodmorning message]",
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setFooter(`Message from: ${message.member.displayName}`, message.member.user.displayAvatarURL())
            .setTimestamp();

        if (!args[0]) {
            embed
                .setColor(message.member.displayHexColor === '#000000' ? '#ffffff' : message.member.displayHexColor)
                .setThumbnail(message.author.displayAvatarURL())
                .addField('Goodmorning Message:', `Goodmorning ${message.member.displayName} rise and shine!`)

            return message.channel.send(embed);
        }
        if (args[0]) {
            let member = await message.mentions.users.first() ? message.guild.members.cache.get(message.mentions.users.first().id) : message.member;

            if (member.id !== message.member.id && args[1]) {
                if (args.slice(1, args.length).join(' ').length >= 2048)
                    return message.reply("You can only use a string less than 2048 characters!").then(m => del(m, 7500));
                else
                    embed
                        .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)
                        .setThumbnail(member.user.displayAvatarURL())
                        .addField('Goodmorning Message:', `${args.slice(1, args.length).join(' ')}`);

                return message.channel.send(embed);
            } else if (member.id == message.member.id && args[0]) {
                embed
                    .setColor(member.user.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)
                    .setThumbnail(member.author.displayAvatarURL())
                    .addField('Goodmorning Message:', `${args.join(' ')}`);

                return message.channel.send(embed);
            } else {
                if (args.slice(1, args.length).join(' ').length >= 2048)
                    return message.reply("You can only use a string less than 2048 characters!").then(m => del(m, 7500));
                else
                    embed
                        .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)
                        .setThumbnail(member.user.displayAvatarURL())
                        .addField('Goodmorning Message:', `Goodmorning ${member.displayName} rise and shine!`);

                return message.channel.send(embed);
            }
        }
    }
}