const Discord = require("discord.js");
const datab = require('quick.db')
const ayarlar = require("../ayarlar.json")
const moment = require("moment");
const ms = require('ms')


   module.exports.run = async (client, message, args) => {
 //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
 
    if(!message.member.roles.cache.has(ayarlar.ownerRolü) && (message.member.roles.cache.has(ayarlar.üstYetkiliRolü)) && (!message.member.hasPermission("ADMINISTRATOR")))  return message.channel.send(new Discord.MessageEmbed().setDescription(`Gerekli yetikiye sahip değilsin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 5000}));
  
    let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  
    if(!member) return message.channel.send(new Discord.MessageEmbed().setDescription(`**Bir kullanıcı etiketlemelisin.**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 5000}));
  
  
   //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
//-------------------------------------DATA BASE------------------------------------------\\
  
  
    let kayıtToplam = datab.fetch(`isimler.${member.id}.toplam1`);
  
    let isimToplam = datab.fetch(`isimlergösterme.${member.id}.toplama`)
  

//-------------------------------------DATA BASE------------------------------------------\\
  
   
   //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
    if(kayıtToplam === null) return message.channel.send (new Discord.MessageEmbed().setDescription(`**<@${member.id}> Kişisine ait isim verisi bulunamadı.**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));
    if(kayıtToplam === undefined) return message.channel.send (new Discord.MessageEmbed().setDescription(`**<@${member.id}> Kişisine ait isim verisi bulunamadı.**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));
    if(isimToplam === null) return message.channel.send (new Discord.MessageEmbed().setDescription(`**<@${member.id}> Kişisine ait isim verisi bulunamadı.**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));
    if(isimToplam === undefined) return message.channel.send (new Discord.MessageEmbed().setDescription(`**<@${member.id}> Kişisine ait isim verisi bulunamadı.**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));
   //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
  
  
  
 //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
   if (member) {
   let is = datab.delete(`isimlergösterme.${member.id}.toplama`)
   let tis = datab.delete(`isimler.${member.id}.toplam1`)|| [];
   message.channel.send(new Discord.MessageEmbed().setDescription(`**Kayıt verilerini sıfırladım.**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));
  
 
}
  //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
  
  
}
  

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["isimsıfırla"],
  PermLevel: 0
};

 

exports.help = {
  name: "isıfırla",
  description: "",
  usage: ""
};