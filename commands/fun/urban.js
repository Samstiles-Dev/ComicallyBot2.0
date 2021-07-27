const { del } = require("../../functions.js");
const urban = require("urban");
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "urban",
    aliases: ["urb", "urbandictionary", "ud"],
    category: "fun",
    description: "Gets an urban dictionary definition",
    usage: "[search <term> | random]",
    permissions: "member",
    run: (client, message, args) => {
        if (!args[0] || !["search", "random"].includes(args[0]))
            return message.reply("Please provide <search|random> (query).").then(m => del(m, 7500));
        let image = "http://cdn.marketplaceimages.windowsphone.com/v8/images/5c942bfe-6c90-45b0-8cd7-1f2129c6e319?imageType=ws_icon_medium";
        let search = args[1] ? urban(args.slice(1).join(" ")) : urban.random();
        try {
            search.first(res => {
                if (!res) return message.reply("No results found for this topic, sorry!").then(m => del(m, 7500));
                let { word, definition, example, thumbs_up, thumbs_down, permalink, author } = res;

                let description = stripIndents`**Defintion:** ${definition || "No definition"}
                    **Example:** ${example || "No Example"}
                    **Upvote:** ${thumbs_up || 0}
                    **Downvote:** ${thumbs_down || 0}
                    **Link:** [link to ${word}](${permalink || "https://www.urbandictionary.com/"})`

                if (description.length >= 1024)
                    return message.reply("This definition is too long of a string for a message embed sorry!").then(m => del(m, 7500));
                else {
                    let embed = new MessageEmbed()
                        .setColor("#0efefe")
                        .setAuthor(`Urban Dictionary | ${word}`, image)
                        .setThumbnail(image)
                        .setDescription(description)
                        .setTimestamp()
                        .setFooter(`Written by ${author || "unknown"}`);

                    message.channel.send(embed)
                }
            });
        } catch (err) {
            return message.channel.send(`Error while searching... ${err}`).then(m => del(m, 7500));
        }
    }
}