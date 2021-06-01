const Economy = require('../models/economy');

module.exports = {
    name: '賣',
    features: '賣出背包物品',
    description: `< !賣 物品名稱 數量 >`,
    timeout: 5000,
    async execute(client, msg, args, Discord){
        if(args[1] && args[2]){
            var item = args[1];
            var amount = args[2];
            switch(item){
                case '普通石頭' :
                    var coin = parseInt(amount) * 5;
                break;
                case '鐵礦' :
                    var coin = parseInt(amount) * 15;
                break;
                case '金條' :
                    var coin = parseInt(amount) * 125;
                break;
                case '鑽石' :
                    var coin = parseInt(amount) * 1000;
                break; 
            }
        }else{
            const embed = new Discord.MessageEmbed()
            .setTitle(`${msg.author.username}`)
            .addField('**訊息**',`\n 輸入的格式錯誤 !`)
            .setColor('#F3A722')
            msg.channel.send(embed);
            return false;
        }
        const [rows] = await Economy.FetchbyuserId(msg.author.id,msg.guild.id);
        var storage = JSON.parse(rows[0].storage);
        let uid = rows[0].uid;

        if(amount > storage[item]){
            const embed = new Discord.MessageEmbed()
            .setTitle(`${msg.author.username}`)
            .addField('**訊息**',`\n 你沒有那麼多的 ${item} !`)
            .setColor('#F3A722')
            msg.channel.send(embed);
        }else{
            storage[item] = storage[item] - amount;
            await Economy.Increasecoin(uid,coin);
            await Economy.Updatestorage(uid,JSON.stringify(storage));
            const embed = new Discord.MessageEmbed()
            .setTitle(`${msg.author.username}`)
            .addField('**賣出**',`\n **${item}** **${amount}** 個`)
            .addField('**收入**',`\n **${coin}** :coin:`)
            .setColor('#F3A722')
            msg.channel.send(embed);
        }
    }
}