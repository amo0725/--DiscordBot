const Timeout = require('../models/timeout');
const Economy = require('../models/economy');
const User = require('../models/user');
const ms = require('ms');

module.exports = async (Discord, client, msg) => {
  try {
    if (!msg.guild || !msg.member) return; //訊息內不存在guild元素 = 非群組消息(私聊)
    if (!msg.member.user) return; //幫bot值多拉一層，判斷上層物件是否存在
    if (msg.member.user.bot) return; //訊息內bot值為正 = 此消息為bot發送
  } catch (err) {
    return;
  }
  try {
    const [rows] = await Economy.FetchbyuserId(msg.author.id,msg.guild.id);
    if (rows[0] === undefined ){
      await User.Create(msg.author.id,msg.guild.id,msg.author.username);
      const [rows] = await User.FetchbyuserId(msg.author.id,msg.guild.id);
      await Economy.Create(rows[0].uid);
    }
    const prefix = '!'; //前綴符號定義
    const prefix_music = '$';
    if (msg.content.substring(0, prefix.length) === prefix) //如果訊息的開頭~前綴字長度的訊息 = 前綴字
    {
      const cmd = msg.content.substring(prefix.length).trim().split(/\s+/);
      const command = client.commands.get(cmd[0]);
      if(command){
        if(command.timeout){
          const [rows_1] = await User.FetchbyuserId(msg.author.id,msg.guild.id);
          const [rows] = await Timeout.Checktimeout(rows_1[0].uid,command.name);
          const timestamp = Date.now();
          if(rows.length > 0){
            if((rows[0].timeout - timestamp) > 0) return msg.reply(`\n 這個指令每  **${ms(command.timeout)}**  只能執行一次 !`)
            else await Timeout.Removetimeout(rows_1[0].uid,command.name);
          }
          let timeout = timestamp + command.timeout;
          await Timeout.Settimeout(rows_1[0].uid,command.name,timeout);
        }
        command.execute(client, msg, cmd, Discord);
      }
    }
    if(msg.content.substring(0, prefix.length) === prefix_music){
      const cmds = ['播', '跳', '停','列','跳到','清'];
      const cmd = msg.content.substring(prefix.length).trim().split(/\s+/);
      if( cmds.indexOf(cmd[0]) != -1){
        const command = client.commands.get('播');
        const args = new Array();
        for(let i = 1 ; i <cmd.length; i++){
          args.push(cmd[i]);
        }
        if(command){
          command.execute( msg, args, cmd[0], client, Discord);
        }
      }
    }
  } catch (err) {
    console.log('OnMessageError', err);
  }
}