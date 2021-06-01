const Load_cmd = require('../handlers/load_cmd');

module.exports = {
    name: '指令',
    features: '查詢所有指令',
    description: '< !指令 >',
    timeout: 10000,
    execute(client, msg, args, Discord){
        const allcommands = Load_cmd();
        
        const embed = {};
        embed.title = `所有指令`;
        embed.color = '#F3A722';
        embed.fields = allcommands;
        msg.channel.send({embed : embed});
    }
}