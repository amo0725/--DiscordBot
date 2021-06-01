const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const message = require('../events/message');

const queue = new Map();

module.exports = {
    name: '播',
    features: '音樂播放機器人',
    description: '< $播 >, < $跳 >,   \n< $停 >, < $列 >,   \n< $跳到 num >',
    async execute(message,args, cmd, client, Discord){


        //Checking for the voicechannel and permissions (you can add more permissions if you like).
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('你必須在一個語音頻道裡 !');
        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('你沒有權限');
        if (!permissions.has('SPEAK')) return message.channel.send('你沒有權限');

        //This is our server queue. We are getting this server queue from the global queue.
        const server_queue = queue.get(message.guild.id);

        //If the user has used the play command
        if (cmd === '播'){
            if (!args.length) return message.channel.send('你必須加上需要播放的音樂');
            let song = {};

            //If the first argument is a link. Set the song object to have two keys. Title and URl.
            if (ytdl.validateURL(args[0])) {
                message.channel.send(`**搜尋中** :mag_right: `+'`'+ args[0] +'`');
                const song_info = await ytdl.getInfo(args[0]);
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url ,user: message.author.username}
            } else {
                message.channel.send(`**搜尋中** :mag_right:`+'`'+args+'`');
                //If there was no link, we use keywords to search for a video. Set the song object to have two keys. Title and URl.
                const video_finder = async (query) =>{
                    const video_result = await ytSearch(query);
                    return (video_result.videos.length > 1) ? video_result.videos[0] : null;
                }

                const video = await video_finder(args.join(' '));
                if (video){
                    song = { title: video.title, url: video.url ,user: message.author.username}
                } else {
                     message.channel.send('找不到影片');
                }
            }

            //If the server queue does not exist (which doesn't for the first video queued) then create a constructor to be added to our global queue.
            if (!server_queue){

                const queue_constructor = {
                    voice_channel: voice_channel,
                    text_channel: message.channel,
                    connection: null,
                    songs: []
                }
                
                //Add our key and value pair into the global queue. We then use this to get our server queue.
                queue.set(message.guild.id, queue_constructor);
                queue_constructor.songs.push(song);
    
                //Establish a connection and play the song with the vide_player function.
                try {
                    const connection = await voice_channel.join();
                    queue_constructor.connection = connection;
                    video_player(message.guild, queue_constructor.songs[0]);
                } catch (err) {
                    queue.delete(message.guild.id);
                    message.channel.send('連線有問題 !');
                    throw err;
                }
            } else{
                server_queue.songs.push(song);
                return message.channel.send(`👍 `+'`'+song.title+'`'+ ` 加入了清單 !`);
                
            }
        }
        else if(cmd === '跳') skip_song(message, server_queue);
        else if(cmd === '停') stop_song(message, server_queue);
        else if(cmd === '列') list_song(message, server_queue,Discord);
        else if(cmd === '跳到') skipto_song(message,server_queue,args);
        else if(cmd === '清') delete_msg(message,args);
    }
    
}

const video_player = async (guild, song) => {
    const song_queue = queue.get(guild.id);

    //If no song is left in the server queue. Leave the voice channel and delete the key and value pair from the global queue.
    if (!song) {
        song_queue.voice_channel.leave();
        queue.delete(guild.id);
        return;
    }
    const stream = ytdl(song.url, { filter: 'audioonly',quality:'highestaudio' });
    const playaudio =song_queue.connection.play(stream, { seek: 0, volume: 0.5 });
        playaudio.on('start',async ()=>{
            await song_queue.text_channel.send(`**撥放中** 🎶 `+'`'+song.title+'`');
        });
        playaudio.on('finish', () => {
            song_queue.songs.shift();
            video_player(guild, song_queue.songs[0]);
        });
        playaudio.on('error', async (err) =>{
            await song_queue.text_channel.send(`**撥放錯誤** :no_entry_sign: `+'`'+song.title+'`');
            song_queue.songs.shift();
            video_player(guild, song_queue.songs[0]);
            console.log(err);
        });
}

const skip_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('你必須在一個語音頻道裡 !');
    if(!server_queue){
        return message.channel.send(`清單裡沒有任何歌曲 😔`);
    }
    server_queue.connection.dispatcher.end();
}

const stop_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('你必須在一個語音頻道裡 !');
    server_queue.songs = [];
    server_queue.connection.dispatcher.end();
}

const list_song = (message, server_queue,Discord) => {
    if (!message.member.voice.channel) return message.channel.send('你必須在一個語音頻道裡 !');
    if(!server_queue){
        return message.channel.send(`清單裡沒有任何歌曲 😔`);
    }else{
        const allsong = [];
        var i = 0;
        const obj2 = {};
        for(const song1 of server_queue.songs){
            const obj = {};
            if(i===0){
                obj.name = '**現 在 播 放 :**';
                obj.value = `[${song1.title}](${song1.url})`+'  `'+`點歌者:${song1.user}`+'`';
                allsong[0] = obj;
            }else if(i === 1){
                obj2.name = '**即 將 播 放 :**';
                obj2.value = `${i}. [${song1.title}](${song1.url})`+'  `'+`點歌者:${song1.user}`+'`';
            }else{
                obj2.value = obj2.value + `\n \n${i}. [${song1.title}](${song1.url})`+'  `'+`點歌者:${song1.user}`+'`';
            }
            i++;
        }
        if(obj2.name != undefined)allsong[1] = obj2;
        const embed = new Discord.MessageEmbed();
        embed.title = `** :musical_note: 撥放清單**`;
        embed.fields = allsong;
        embed.color = '#F3A722'
        message.channel.send(embed);
    }
}

const skipto_song = (message, server_queue,args) => {
    if (!message.member.voice.channel) return message.channel.send('你必須在一個語音頻道裡 !');
    if (!args.length) return message.channel.send('你必須要加上你想要跳到第幾首');
    if(args === 1) server_queue.connection.dispatcher.end();
    else{
        server_queue.songs.splice(0,args-1);
        server_queue.connection.dispatcher.end();
    }
}

const delete_msg = async (message,args) => {
    if (!args.length) return message.channel.send('你必須要加上你想要跳到第幾首');
    if(isNaN(args)) return message.channel.send('你必須輸入數字');

    if(args>100) return message.channel.send('清除筆數必須小於100筆');
    if(args<1) return message.channel.send('清除筆數必須大於1筆');

    if (message.channel.type === 'text'){
        await message.channel.messages.fetch({limit: args}).then(messages =>{
            message.channel.bulkDelete(messages);
        });
    }
}