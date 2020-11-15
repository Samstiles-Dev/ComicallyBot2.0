const db = require("../../schemas/db.js");
const { del } = require("../../functions.js")

module.exports = {
    name: "removewelcomechannel",
    aliases: ["removewelcomech", "rwelcomech"],
    category: "helpful",
    description: "Removes the channel where the welcome messages will be sent for new users.",
    permissions: "moderator",
    run: (client, message, args) => {
        db.findOne({ guildID: message.guild.id, channels: { $elemMatch: { command: "welcome" } } }, (err, exists) => {
            if (exists) {
                db.updateOne({ guildID: message.guild.id, 'channels.command': "welcome" }, {
                    $pull: { channels: { command: "welcome" } }
                }).catch(err => console.log(err));
                return message.reply("Removed welcome channel.").then(m => del(m, 7500));
            } else return message.reply("There has been no welcome channel set.").then(m => del(m, 7500));
        });
    }
}