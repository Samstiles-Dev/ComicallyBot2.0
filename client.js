const { Client, Intents, Collection } = require("discord.js");
const fs = require("fs");
const { config } = require("dotenv");
const client = new Client({ ws: { intents: Intents.ALL }, partials: ['GUILD_MEMBER', 'REACTION', 'CHANNEL', 'MESSAGE'], shardCount: 1 });
const { Manager } = require("erela.js");
const AntiSpam = require('discord-anti-spam');

client.music = new Manager({
    nodes: [{ host: "localhost", port: 2333, password: process.env.ERELA }], send(id, payload) {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
    },
});

client.antiSpam = new AntiSpam({
    warnThreshold: 5, muteThreshold: 7, kickThreshold: 99, banThreshold: 99, maxInterval: 2000,
    warnMessage: '{@user}, Please stop spamming or you will be muted.',
    kickMessage: '**{user_tag}** has been kicked for spamming.',
    muteMessage: '**{user_tag}** has been muted for spamming.',
    maxDuplicatesWarning: 6, maxDuplicatesKick: 99, maxDuplicatesBan: 99, maxDuplicatesMute: 8,
    ignoredPermissions: ['MANAGE_NICKNAMES'],
    ignoreBots: true, verbose: false, muteRoleName: "Muted",
    removeMessages: true, removeBotMessages: false, ignoreBots: true,
    ignoredPermissions: ['MANAGE_NICKNAMES', 'MANAGE_MESSAGES'],
    verbose: false, muteRoleName: "Muted", removeMessages: true,
});
config({ path: __dirname + "/.env" });
global.prefix = "=";
global.voiceChannels = [], global.profanityUsers = [];

["aliases", "commands"].forEach(x => client[x] = new Collection());
["command", "event", "erela", "antiSpam"].forEach(x => require(`./handlers/${x}`)(client));
require(`./handlers/error`)(client, process);
client.categories = new fs.readdirSync("./commands/");

client.login(process.env.TOKEN);