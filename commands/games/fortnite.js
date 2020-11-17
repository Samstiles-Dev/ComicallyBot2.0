const { del } = require("../../functions.js");
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const Client = require("fortnite");
const ft = new Client(process.env.FORTNITE);

module.exports = {
    name: "fortnite",
    aliases: ["ft", "ftstats", "fortnitestats", "fn", "ftn"],
    category: "games",
    description: "Display someone's stats, the current store, and challenges.",
    permissions: "member",
    usage: "<username | store> [pc, xb1, psn]",
    run: async (client, message, args) => {
        const platforms = ["pc", "xb1", "psn"];

        if (!args[0]) message.reply("Please provide a Fortnite username").then(m => del(m, 7500));
        else
            if (args[0].toLowerCase() === "store" || args[0].toLowerCase() === "shop") {
                const store = await ft.store()
                    .catch(err => message.reply(`Something went wrong ${err}`).then(m => del(m, 7500)));;

                const embed = new MessageEmbed()
                    .setColor("#9d4dbb")
                    .setFooter("Fortnite store", message.author.displayAvatarURL())
                    .setTimestamp();

                store.sort((a, b) => {
                    return b.vbucks - a.vbucks;
                });

                store.forEach((el, index) => {
                    if(index<40)
                    {
                    embed.addField(el.name, stripIndents`**- Rarity:** ${el.rarity}
                    **- Price:** ${el.vbucks} v-bucks
                    **- Image:** [Press Me](${el.image})`, true)
                    }
                });

                message.channel.send(embed);
            } else {
                const lastWord = args[args.length - 1].toLowerCase();

                let platform, username;

                if (platforms.includes(lastWord)) {
                    username = args.slice(0, args.length - 1).join(" ");
                    platform = lastWord;
                } else {
                    username = args.join(" ");
                    platform = "pc";
                }

                const search = await ft.user(username, platform)
                    .catch(err => message.reply(`Something went wrong ${err}`).then(m => del(m, 7500)));

                if (!search.username) {
                    return message.channel.send("Couldn't find that person, try again").then(m => del(m, 7500));
                }

                const lifetime = search.stats.lifetime;
                const solo = search.stats.solo;
                const duo = search.stats.duo;
                const squad = search.stats.squad;

                try{
                const embed = new MessageEmbed()
                    .setTitle(`${search.username} (${search.platform})`)
                    .setURL(search.url)
                    .setColor("#9d4dbb")
                    .setFooter(`Fortnite stats`, message.author.displayAvatarURL())
                    .setTimestamp()
                    .addField("Solo:", stripIndents`**- Wins:** ${solo.wins}
                    **- KD:** ${solo.kd}
                    **- Kills:** ${solo.kills}
                    **- Kills per match:** ${solo.kills_per_match}`, true)
                    .addField("Duo:", stripIndents`**- Wins:** ${duo.wins}
                    **- KD:** ${duo.kd}
                    **- Kills:** ${duo.kills}
                    **- Kills per match:** ${duo.kills_per_match}`, true)
                    .addField("Squad:", stripIndents`**- Wins:** ${squad.wins}
                    **- KD:** ${squad.kd}
                    **- Kills:** ${squad.kills}
                    **- Kills per match:** ${squad.kills_per_match}`, true)
                    .addField("Lifetime:", stripIndents`**- Wins:** ${lifetime.wins}
                    **- KD:** ${lifetime.kd}
                    **- Kills:** ${lifetime.kills}`, false)

                    message.channel.send(embed).then(m => del(m, 30000));
                }catch{
                    return message.reply("There was an error finding the stats for this user..").then(m => del(m, 7500));
                }
            }
    }
}