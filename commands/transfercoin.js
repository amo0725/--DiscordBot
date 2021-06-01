const Economy = require('../models/economy');
const User = require('../models/user');
const Convert = require('./functions/numconvert');

module.exports = {
    name: '轉',
    features: '轉帳機',
    description: '< !轉 @誰 金額 >',
    async execute(client, msg, args, Discord){
        if(args[1] && args[2]){
            var amount = args[2];
            var target = msg.mentions.users.first();
            if(!target){
                const embed = new Discord.MessageEmbed()
                .setTitle(`${msg.author.username}`)
                .addField('**訊息**',`\n 必須標記轉帳目標 !`)
                .setColor('#F3A722')
                msg.channel.send(embed);
                return false;
            }
            const [rows_2] = await Economy.FetchbyuserId(target.id, msg.guild.id);
            if (rows_2[0] === undefined) {
                await User.Create(target.id, msg.guild.id, target.username);
                const [rows_2] = await User.FetchbyuserId(target.id, msg.guild.id);
                const tid = rows_2[0].uid
                await Economy.Create(tid);
            }
        }else{
            const embed = new Discord.MessageEmbed()
            .setTitle(`${msg.author.username}`)
            .addField('**訊息**',`\n 輸入格式錯誤 !`)
            .setColor('#F3A722')
            msg.channel.send(embed);
            return false;
        }
        
        const [rows] = await Economy.FetchbyuserId(msg.author.id,msg.guild.id);
        let bank = rows[0].bank;
        let uid = rows[0].uid;
        const [rows_2] = await Economy.FetchbyuserId(target.id, msg.guild.id);
        const tid = rows_2[0].uid;

        if(amount > bank){
            const embed = new Discord.MessageEmbed()
            .setTitle(`${msg.author.username}`)
            .addField('**訊息**',`\n 別裝闊~~你才沒有那麼多錢可以轉 !`)
            .setColor('#F3A722')
            msg.channel.send(embed);
        }else{
            await Economy.Decreasebank(uid, amount);
            await Economy.Increasebank(tid, amount);
            const [rows_1] = await Economy.FetchbyuserId(msg.author.id,msg.guild.id);
            let coins = Convert(rows_1[0].coins);
            let bank = Convert(rows_1[0].bank);
            const embed = new Discord.MessageEmbed()
            .setTitle(`${msg.author.username} 成功轉給 ${target.username} **${amount} :coin:**`)
            .addField('**帳戶資訊**',`\n 口袋 : **${coins}** :coin: \n 銀行 : **${bank}** :coin:`)
            .setColor('#F3A722')
            msg.channel.send(embed);
        }
    }
}