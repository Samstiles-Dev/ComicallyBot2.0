const { del } = require("../../functions.js");
const db = require('../../schemas/db.js');

module.exports = {
    name: "getsuggestchannel",
    aliases: ["getsuggestch", "gsc"],
    category: "suggestion",
    description: "Get the channel for suggest command.",
    permissions: "moderator",
    usage: "<#channel | channelID>",
    run: (client, message, args) => {
        db.findOne({ guildID: message.guild.id, channels: { $elemMatch: { command: "suggest" } } }, async (err, exists) => {
            if (exists) {
                let channel = await client.channels.cache.get(exists.channels.filter(x => x.command === "suggest")[0].channelID);
                return message.reply(`The suggestion channel is: ${channel}.`).then(m => del(m, 30000));
            } else return message.reply("There has been no suggestion channel set.").then(m => del(m, 7500));
        });
    }
}