const { s, del, getCommandStatus, hasPermissions, } = require("../../functions.js");
const { messageXP, checkBadWords, checkSpam } = require("../../dbFunctions.js");
const db = require("../../schemas/db.js");
const fetch = require('node-fetch');

let cooldown = new Set();
let cdseconds = 5;

module.exports = async (client, message) => {
    if (!message) return;
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.member) message.member = await message.guild.fetchMember(message).catch(err => err);

    checkBadWords(message);
    checkSpam(client, message);

    if (!cooldown.has(message.author.id))
        messageXP(message, client);

    cooldown.add(message.author.id);

    setTimeout(() => {
        cooldown.delete(message.author.id);
    }, cdseconds * 1000);

    if (!message.content.startsWith(prefix) && !message.content.replace(/\D/g, '').startsWith(`${client.user.id}`)) {
        db.findOne({ guildID: message.guild.id, channels: { $elemMatch: { command: "Bot Chatting" } } }, async (err, exists) => {
            if (exists) {
                let channel = await client.channels.cache.get(exists.channels.filter(x => x.command === "Bot Chatting")[0].channelID);
                if (message.channel == channel) {
                    let url = `https://www.cleverbot.com/getreply?key=${process.env.CLEVERBOT}&input=${message.content.replace(/[^\w\s!?]/g, '')}`, settings = { method: "Get" };
                    fetch(url, settings)
                        .then(res => res.json()).catch(err => err)
                        .then((json) => {
                            if (json.output) return s(message.channel, `${json.output}`).catch(err => err);
                        });
                }
            } else return;
        });
        return;
    }

    if (message.content.startsWith(prefix) && !message.content.replace(/\D/g, '').startsWith(`${client.user.id}`)) {
        const args = message.content.startsWith(prefix) ? message.content.slice(prefix.length).trim().split(/ +/g) : message.content.replace(/[^\s]*/, '').trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();

        if (cmd.length === 0) return;

        let command = client.commands.get(cmd);
        if (!command) command = client.commands.get(client.aliases.get(cmd));

        if (command) {
            const channelPermissions = message.channel.permissionsFor(message.guild.me);

            if (!channelPermissions.has("VIEW_CHANNEL")) return;

            if (!channelPermissions.has("SEND_MESSAGES"))
                return message.author.send("I am missing permissions to `SEND_MESSAGES`").then(m => del(m, 60000));

            if (!channelPermissions.has("EMBED_LINKS"))
                return message.reply("I am missing permissions to `EMBED_LINKS` for certain commands.").then(m => del(m, 30000));

            if (!channelPermissions.has("READ_MESSAGE_HISTORY"))
                return message.reply("I am missing permissions to `READ_MESSAGE_HISTORY` for certain commands.").then(m => del(m, 30000));

            if (!message.guild.me.permissions.has("MANAGE_ROLES"))
                return message.reply("I am missing permissions to `MANAGE_ROLES` for auto-moderation.").then(m => del(m, 30000));

            if (!channelPermissions.has("MANAGE_MESSAGES") || !channelPermissions.has("ADD_REACTIONS"))
                return message.reply("I am missing permissions to `MANAGE_MESSAGES` for a clean command experience"
                    + " and/or permissions for `ADD_REACTIONS` for essential commands.").then(m => del(m, 30000));


            let perms = await hasPermissions(message, command.permissions);
            let cmdStatus = await getCommandStatus(message, command.name);

            del(message, 0);

            if (command.category !== 'command' && command.category !== "owner" && command.category !== "support") {
                if (!cmdStatus) return message.reply("This command is currently disabled.").then(m => del(m, 7500));
                if (!perms) return message.reply("You do not have permissions for this command.").then(m => del(m, 7500))
                else return command.run(client, message, args);
            } else {
                if (!perms) return message.reply("You do not have permissions for this command.").then(m => del(m, 7500));
                else return command.run(client, message, args);
            }
        }
    }
}