const { del } = require("../../functions.js");
const db = require("../../schemas/db.js");
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "getranks",
    aliases: ["ranks", "listranks", "getroles"],
    category: "leveling",
    description: "List of ranks that can be purchased with coins.",
    permissions: "member",
    run: async (client, message, args) => {
        const guildID = message.guild.id;

        const embed = new MessageEmbed()
            .setColor("#0efefe")
            .setTitle("XP Level Ranks")
            .setFooter(message.guild.me.displayName, client.user.displayAvatarURL())
            .setDescription("List of XP Level ranks")
            .setTimestamp();

        const m = await message.channel.send(embed);

        db.findOne({ guildID: guildID }, (err, exists) => {
            if (exists.xpRoles.length > 0) {
                let rankList = exists.xpRoles.map(rank => "Name: " + `\`${rank.roleName}\`` + ", ID: " + `\`${rank.roleID}\`` + ", level: " + `\`${rank.level}\``);
                embed.setDescription("").addField("Ranks: ", rankList);
                m.edit(embed).then(del(m, 30000));
            } else {
                embed.setDescription("").addField("Ranks: ", "There have been no level ranks set");
                m.edit(embed).then(del(m, 30000));
            }
        }).catch(err => console.log(err))
    }
}
