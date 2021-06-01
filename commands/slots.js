const Economy = require('../models/economy');

module.exports = {
    name: '拉',
    features: '拉霸機',
    description: '< !拉 金額 >',
    timeout: 5000,
    async execute(client, msg, args, Discord){
        if(args[1]){
            var bet = args[1];
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
            var slots = [':cherries:',':tangerine:',':grapes:',':star:',':gem:'];
            var result_1 = Math.floor(Math.random() * 5);
            var result_2 = Math.floor(Math.random() * 5);
            var result_3 = Math.floor(Math.random() * 5);
            var tmp_1 = Math.floor(Math.random() * 5);
            var tmp_2 = Math.floor(Math.random() * 5);
            var tmp_3 = Math.floor(Math.random() * 5);
            var tmp_4 = Math.floor(Math.random() * 5);
            var tmp_5 = Math.floor(Math.random() * 5);
            var tmp_6 = Math.floor(Math.random() * 5);
                    if(slots[result_1] === slots[result_2] && slots[result_2] === slots[result_3]){
                        switch(result_1){
                            case 0 :
                                var prize = parseInt(args[1]) * 5;
                            break;

                            case 1 :
                                var prize = parseInt(args[1]) * 15;
                            break;

                            case 2 :
                                var prize = parseInt(args[1]) * 40;
                            break;

                            case 3 :
                                var prize = parseInt(args[1]) * 100;
                            break;

                            case 4 :
                                var prize = parseInt(args[1]) * 2000;
                            break;
                        }
                        await Economy.Increasecoin(uid, prize);
                        const embed = new Discord.MessageEmbed()
                        .setTitle(`${msg.author.username} 贏了 **${prize}** :coin:`)
                        .addField('**拉霸機**',
                        `\n **${slots[tmp_1]}** | **${slots[tmp_2]}** | **${slots[tmp_3]}**
                        \n **${slots[result_1]}** | **${slots[result_2]}** | **${slots[result_3]}**\u3000<<<
                        \n **${slots[tmp_4]}** | **${slots[tmp_5]}** | **${slots[tmp_6]}**`)
                        .setColor('#F3A722')
                         msg.channel.send(embed);
                    }else if(slots[result_1] === slots[result_2] && slots[result_3]){
                        switch(result_1){
                            case 0 :
                                var prize = parseInt(args[1]) * 2;
                            break;

                            case 1 :
                                var prize = parseInt(args[1]) * 5;
                            break;

                            case 2 :
                                var prize = parseInt(args[1]) * 10;
                            break;

                            case 3 :
                                var prize = parseInt(args[1]) * 30;
                            break;

                            case 4 :
                                var prize = parseInt(args[1]) * 80;
                            break;
                        }
                        await Economy.Increasecoin(uid, prize);
                        const embed = new Discord.MessageEmbed()
                        .setTitle(`${msg.author.username} 贏了 **${prize}** :coin:`)
                        .addField('**拉霸機**',
                        `\n **${slots[tmp_1]}** | **${slots[tmp_2]}** | **${slots[tmp_3]}**
                        \n **${slots[result_1]}** | **${slots[result_2]}** | **${slots[result_3]}**\u3000<<<
                        \n **${slots[tmp_4]}** | **${slots[tmp_5]}** | **${slots[tmp_6]}**`)
                        .setColor('#F3A722')
                         msg.channel.send(embed);
                    }else{
                        await Economy.Decreasecoin(uid, bet);
                        const embed = new Discord.MessageEmbed()
                        .setTitle(`${msg.author.username} 輸了 **${bet}** :coin:`)
                        .addField('**拉霸機**',
                        `\n **${slots[tmp_1]}** | **${slots[tmp_2]}** | **${slots[tmp_3]}**
                        \n **${slots[result_1]}** | **${slots[result_2]}** | **${slots[result_3]}**\u3000<<<
                        \n **${slots[tmp_4]}** | **${slots[tmp_5]}** | **${slots[tmp_6]}**`)
                        .setColor('#F3A722')
                         msg.channel.send(embed);
                    }
        }
         
    }
}