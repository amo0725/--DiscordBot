const Economy = require('../models/economy');

module.exports = {
    name: '丟',
    features: '賭硬幣',
    description: '< !丟 正or反 金額 >',
    async execute(client, msg, args, Discord){
        if(args[1] && args[2]){
            var num = args[1];
            var bet = args[2];
        }else{
            const embed = new Discord.MessageEmbed()
            .setTitle(`${msg.author.username}`)
            .addField('**訊息**',`\n 輸入的格式錯誤 !`)
            .setColor('#F3A722')
            msg.channel.send(embed);
        }
        const [rows] = await Economy.FetchbyuserId(msg.author.id,msg.guild.id);
        let coins = rows[0].coins;
        let bank = rows[0].bank;
        let uid = rows[0].uid;
        
        if(coins == 0 && bank == 0){
            const embed = new Discord.MessageEmbed()
            .setTitle(`${msg.author.username}`)
            .addField('**訊息**',`\n 臭乞丐，這不是你該來的地方 !`)
            .setColor('#F3A722')
            msg.channel.send(embed);
        }else if(coins == 0 && bank != 0){
            const embed = new Discord.MessageEmbed()
            .setTitle(`${msg.author.username}`)
            .addField('**訊息**',`\n 沒帶錢還敢來賭阿 !`)
            .setColor('#F3A722')
            msg.channel.send(embed);
        }
        else if(bet > coins){
            const embed = new Discord.MessageEmbed()
            .setTitle(`${msg.author.username}`)
            .addField('**訊息**',`\n 沒那麼多錢就別來沾邊 !`)
            .setColor('#F3A722')
            msg.channel.send(embed);
            return false;
        }else{
            var flip = ['正','反'];
            var point = Math.floor(Math.random()*2);
            var prize = parseInt(args[2]) * 2;
                    if(num == flip[point]){
                        await Economy.Increasecoin(uid, prize);
                        const embed = new Discord.MessageEmbed()
                        .setTitle(`${msg.author.username} 贏了 **${prize}** :coin:`)
                        .addField('**硬幣結果**',`\n :coin: **${flip[point]}面**`)
                        .setColor('#F3A722')
                         msg.channel.send(embed);
                    }
                    else{
                        await Economy.Decreasecoin(uid, bet);
                        const embed = new Discord.MessageEmbed()
                        .setTitle(`${msg.author.username} 輸了 **${bet}** :coin:`)
                        .addField('**硬幣結果**',`\n :coin: **${flip[point]}面**`)
                        .setColor('#F3A722')
                         msg.channel.send(embed);
                    }
        }
         
    }
}