const Economy = require('../models/economy');
const Convert = require('./functions/numconvert');

module.exports = {
    name: '餘額',
    features: '查詢帳戶資訊',
    description: `< !餘額 >`,
    timeout: 10000,
    async execute(client, msg, args, Discord){
        const [rows] = await Economy.FetchbyuserId(msg.author.id,msg.guild.id);
        let coins = Convert(rows[0].coins);
        let bank = Convert(rows[0].bank);

        const embed = new Discord.MessageEmbed()
        .setTitle(`${msg.author.username} 查詢餘額`)
        .addField('**帳戶資訊**',`\n 口袋 : **${coins}** :coin: \n 銀行 : **${bank}** :coin:`)
        .setColor('#F3A722')
        msg.channel.send(embed);
    }
}