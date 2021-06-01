const fs = require('fs');

module.exports = (client, Discord) => {
  const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
  const allcommands = [];
  var i = 0;
  for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    const com_obj = {};
    if(command.name){
      client.commands.set(command.name, command);
      com_obj.name = command.name;
      com_obj.description = command.description;
      com_obj.inline = true;
      allcommands[i]=com_obj;
      i++;
    }else{
      continue;
    }
  }
}
