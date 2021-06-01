const Economy = require('../models/economy');

module.exports = {
    name: '骰',
    features: '賭骰子',
    description: '< !骰 點數 金額 >',
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
            return false;
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
        }else{
            var point = Math.floor(Math.random()*6)+1;
            var prize = parseInt(args[2]) * 4;
                    if(point == num){
                        await Economy.Increasecoin(uid, prize);
                        const embed = new Discord.MessageEmbed()
                        .setTitle(`${msg.author.username} 贏了 **${prize}** :coin:`)
                        .addField('**骰子結果**',`\n :game_die: **${point}**`)
                        .setColor('#F3A722')
                         msg.channel.send(embed);
                    }
                    else{
                        await Economy.Decreasecoin(uid, bet);
                        const embed = new Discord.MessageEmbed()
                        .setTitle(`${msg.author.username} 輸了 **${bet}** :coin:`)
                        .addField('**骰子結果**',`\n :game_die: **${point}**`)
                        .setColor('#F3A722')
                         msg.channel.send(embed);
                    }
        }
         
    }
}