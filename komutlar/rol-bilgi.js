
const Discord = require('discord.js')

exports.run = async(client, message, args) => {

  
  
  

   if(!message.member.roles.cache.has("797827577296715838")) return message.channel.send('**Gerekli yetkiye sahip değilsiniz**');

     let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);

    const roll = message.guild.roles.cache.find(role => role.id == rol.id);
    const uyeler = message.guild.members.cache.filter(member => member.roles.cache.find(role => role == roll)).map(member => member.user.id);

  
  
  
  
    const embed = new Discord.MessageEmbed()
    .setDescription(`<@&${roll.id}> rolüne sahip kullanıcılar aşağıda listelenmiştir.\n\n <@${uyeler.join('\n')}>`);
    message.channel.send(embed);
  
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["rolbilgi", "rolkişiler", "rk"],
    permLvl: 0,
}

exports.help = {
      name: "rb"
  
}





