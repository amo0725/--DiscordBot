const Economy = require('../models/economy');

module.exports = {
    name: '挖',
    features: '挖礦 ( 50 :coin: /次 )',
    description: `< !挖 次數>`,
    timeout: 1000,
    async execute(client, msg, args, Discord){
        const [rows] = await Economy.FetchbyuserId(msg.author.id,msg.guild.id);
        var coins = rows[0].coins;
        let uid = rows[0].uid;
        if(args[1]>1000000){
            const embed = new Discord.MessageEmbed()
            .setTitle(`${msg.author.username}`)
            .addField('**訊息**',`\n 你不能一次挖超過一百萬次 !`)
            .setColor('#F3A722')
            msg.channel.send(embed);
            return false
        }
        if(coins < args[1]*50){
            const embed = new Discord.MessageEmbed()
            .setTitle(`${msg.author.username}`)
            .addField('**訊息**',`\n 你沒有足夠的 :coin: !`)
            .setColor('#F3A722')
            msg.channel.send(embed);
            return false
        }
        var storage = JSON.parse(rows[0].storage);
        var coin = 0, stone = 0, iron = 0, gold = 0, diamond = 0;
        await Economy.Decreasecoin(uid, args[1]*50);

        for(let i=0; i<args[1]; i++){
            var result = Math.floor(Math.random() * 100);

            if(result === 99){
                coin = coin + Math.floor(Math.random() * 500)+1;
            }else if(result === 0){
                diamond = diamond + Math.floor(Math.random() * 2) + 1;
            }else if(result < 60 && result > 0){
                stone = stone + Math.floor(Math.random() * 4) + 5;
            }else if(result < 90 && result > 59){
                iron = iron + Math.floor(Math.random() * 3) + 4;
            }else if(result < 99 && result > 89){
                gold = gold + Math.floor(Math.random() * 3) + 3;
            }

        }
            await Economy.Increasecoin(uid, coin);
            storage['鑽石'] = storage['鑽石'] + diamond;
            storage['普通石頭'] = storage['普通石頭'] + stone;
            storage['鐵礦'] = storage['鐵礦'] + iron;
            storage['金條'] = storage['金條'] + gold;
            await Economy.Updatestorage(uid,JSON.stringify(storage));
            const embed = new Discord.MessageEmbed()
            .setTitle(`${msg.author.username} 挖礦中....`)
            .addField(`**結果**`, `\n **${coin}** :coin: \n **${diamond}** *鑽石* \n **${gold}** *金條* \n **${iron}** *鐵礦* \n **${stone}** *普通石頭*`)
            .setColor('#F3A722')
            msg.channel.send(embed);
    }
}