const fs = require('fs');

module.exports = (client, Discord) => {
    const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
    const allcommands = [];
    var i = 0;
    for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        const com_obj = {};
        if (command.name) {
            com_obj.name = command.features;
            com_obj.value = command.description;
            com_obj.inline = true;
            allcommands[i] = com_obj;
            i++;
        } else {
            continue;
        }
    }
    return allcommands;
}