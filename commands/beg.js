const Economy = require('../models/economy');
const Convert = require('./functions/numconvert');

module.exports = {
    name: '乞討',
    features: '上街乞討',
    description: '< !乞討 >',
    timeout: 600000,
    async execute(client, msg, args, Discord){
        let beg = Math.floor(Math.random()*100)+1;
        const [rows] = await Economy.FetchbyuserId(msg.author.id,msg.guild.id);
        let uid = rows[0].uid;
        await Economy.Increasecoin(uid,beg);
        const [rows_1] = await Economy.FetchbyuserId(msg.author.id,msg.guild.id);
        let coins = Convert(rows_1[0].coins);
        let bank = Convert(rows_1[0].bank);
        

        const embed = new Discord.MessageEmbed()
        .setTitle(`${msg.author.username} 成功乞討 ** ${beg} :coin:**`)
        .addField('**帳戶資訊**',`\n 口袋 : **${coins}** :coin: \n 銀行 : **${bank}** :coin:`)
        .setColor('#F3A722')
        msg.channel.send(embed);
    }
}