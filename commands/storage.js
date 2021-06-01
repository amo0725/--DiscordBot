const Economy = require('../models/economy');

module.exports = {
    name: '背包',
    features: '查詢背包物品',
    description: `< !背包 >`,
    timeout: 10000,
    async execute(client, msg, args, Discord){
        const [rows] = await Economy.FetchbyuserId(msg.author.id,msg.guild.id);
        var storage = JSON.parse(rows[0].storage);

        const embed = new Discord.MessageEmbed()
        .setTitle(`${msg.author.username} 查詢背包物品`)
        .addField('**背包資訊**',`\n 普通石頭 : **${storage['普通石頭']}** \n 鐵礦 : **${storage['鐵礦']}** \n 金條 : **${storage['金條']}** \n 鑽石 : **${storage['鑽石']}** `)
        .setColor('#F3A722')
        msg.channel.send(embed);
    }
}