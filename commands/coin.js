const Economy = require('../models/economy');
const Convert = require('./functions/numconvert');

module.exports = {
    name: '提',
    features: '提款機',
    description: '< !提 金額 >',
    async execute(client, msg, args, Discord){
        if(args[1]){
            var take = args[1];
        }else{
            const embed = new Discord.MessageEmbed()
            .setTitle(`${msg.author.username}`)
            .addField('**訊息**',`\n 請輸入欲提取金額 !`)
            .setColor('#F3A722')
            msg.channel.send(embed);
            return false;
        }
        
        const [rows] = await Economy.FetchbyuserId(msg.author.id,msg.guild.id);
        let bank = rows[0].bank;
        let uid = rows[0].uid;

        if(take > bank){
            const embed = new Discord.MessageEmbed()
            .setTitle(`${msg.author.username}`)
            .addField('**訊息**',`\n 你才沒有那麼多錢可以提 !`)
            .setColor('#F3A722')
            msg.channel.send(embed);
        }else{
            await Economy.Decreasebank(uid, take);
            await Economy.Increasecoin(uid, take);
            const [rows_1] = await Economy.FetchbyuserId(msg.author.id,msg.guild.id);
            let coins = Convert(rows_1[0].coins);
            let bank = Convert(rows_1[0].bank);
            const embed = new Discord.MessageEmbed()
            .setTitle(`${msg.author.username} 成功提取 **${take} :coin:**`)
            .addField('**帳戶資訊**',`\n 口袋 : **${coins}** :coin: \n 銀行 : **${bank}** :coin:`)
            .setColor('#F3A722')
            msg.channel.send(embed);
        }
    }
}