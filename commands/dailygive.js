const Economy = require('../models/economy');

module.exports = {
    name: '簽到',
    features: '簽到領獎',
    description: '< !簽到 >',
    timeout: 86400000,
    async execute(client, msg, args, Discord){
        const [rows] = await Economy.FetchbyuserId(msg.author.id,msg.guild.id);
        await Economy.Dailycoin(rows[0].uid);
    
        const embed = new Discord.MessageEmbed()
        .setTitle(`${msg.author.username} 成功領取每日獎勵 **800 :coin: **`)
        .setColor('#F3A722')
        msg.channel.send(embed);
    }
}