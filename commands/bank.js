const Economy = require('../models/economy');
const Convert = require('./functions/numconvert');

module.exports = {
    name: '存',
    features: '存款機',
    description: '< !存 金額 >',
    async execute(client, msg, args, Discord){
        if(args[1]){
            var save = args[1];
        }else{
            const embed = new Discord.MessageEmbed()
            .setTitle(`${msg.author.username}`)
            .addField('**訊息**',`\n 請輸入欲存入金額 !`)
            .setColor('#F3A722')
            msg.channel.send(embed);
            return false;
        }
        
        const [rows] = await Economy.FetchbyuserId(msg.author.id,msg.guild.id);
        let coins = rows[0].coins;
        let uid = rows[0].uid;

        if(save > coins){
            const embed = new Discord.MessageEmbed()
            .setTitle(`${msg.author.username}`)
            .addField('**訊息**',`\n 你才沒有那麼多錢可以存 !`)
            .setColor('#F3A722')
            msg.channel.send(embed);
        }else{
            await Economy.Decreasecoin(uid, save);
            await Economy.Increasebank(uid, save);
            const [rows_1] = await Economy.FetchbyuserId(msg.author.id,msg.guild.id);
            let coins = Convert(rows_1[0].coins);
            let bank = Convert(rows_1[0].bank);
            const embed = new Discord.MessageEmbed()
            .setTitle(`${msg.author.username} 成功存入 **${save} :coin:**`)
            .addField('**帳戶資訊**',`\n 口袋 : **${coins}** :coin: \n 銀行 : **${bank}** :coin:`)
            .setColor('#F3A722')
            msg.channel.send(embed);
        }
    }
}