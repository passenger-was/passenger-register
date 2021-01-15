const { dc, MessageEmbed } = require('discord.js')
const datab = require('quick.db')
const ms = require('ms')
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
  
 //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
  

  if(!message.member.roles.cache.has(ayarlar.KayıtYetkilisi) && (!message.member.roles.cache.has(ayarlar.üstYetkiliRolü) && (!message.member.hasPermission("ADMINISTRATOR")))) return message.channel.send(new MessageEmbed().setDescription(`**Gerekli yetikiye sahip değilsin.**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 5000}));  

  
  
  //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
  let sayfa = 1;

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if(!member) return message.channel.send(new MessageEmbed().setDescription(`**Bir kullanıcı etiketlemelisin.**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 5000}));
    let data = datab.get(`isimlergösterme2.${member.id}.toplama`);
  
  //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
  
  
    if(data === null) return message.channel.send (new MessageEmbed().setDescription(`**Kişiye ait isim verisi bulunamadı.**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));
    if(data === undefined) return message.channel.send (new MessageEmbed().setDescription(`**Kişiye ait isim verisi bulunamadı.**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));
  
  
  //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
   
    
  //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
   const listesıralama = data.map((v, index) => `\`${index + 1}.\` \n • **İsim:**  (\`${v.İsim} | ${v.Yas}\`) + • **KayıtNo:** \`(${v.KayıtNO})\` \n • **Yetkili:**  (${message.guild.members.cache.has(v.Yetkili) ? message.guild.members.cache.get(v.Yetkili) : "Bulunamadı."}) \n • **Cinsiyet** **(${v.Cinsiyet ? v.Cinsiyet : "Belirleniyor.."})** \n • **Zaman:**  (${v.Zaman}) \n ================= ` )
      var embed = await message.channel.send(new MessageEmbed()
   .setDescription(`${member} kişisinin sunucuda tüm \`isim/yaş/kayıt/yetkili/saat\` verileri: \n ${listesıralama.slice(sayfa == 1 ? 0 : sayfa * 5 - 5, sayfa * 5).join("\n")}`))

   if (listesıralama.length > 1) {
   await embed.react(`◀`);    
   await embed.react(`▶`);
   await embed.react(`❌`);
   await embed.react(`✅`);
    
   
 
    let emojiler = embed.createReactionCollector((react, member) => ["◀", "▶", "✅", "❌"].some(e => e == react.emoji.name) && member.id == message.member.id, {
    time: 2000000
    });
    
     emojiler.on("collect", (react, member) => {
      if (react.emoji.name == "▶") {
        if (listesıralama.slice((sayfa + 1) * 5 - 5, (sayfa + 1) * 5).lenght <= 0) return;
        sayfa += 1;  
        let yenisayfa = listesıralama.slice(sayfa == 1 ? 0 : sayfa * 5 - 5, sayfa * 5);
        embed.edit(new MessageEmbed().setDescription(`${member} kişisinin sunucuda tüm \`isim/yaş/kayıt/yetkili/saat\` verileri: \n ${yenisayfa.join("\n")}`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })));
      
      
      }
     
     
       if (react.emoji.name == "◀") {
                    if (listesıralama.slice((sayfa - 1) * 5 - 5, (sayfa - 1) * 5).length <= 0) return;
                    sayfa -= 1;
                    let yenisayfa = listesıralama.slice(sayfa == 1 ? 0 : sayfa * 5 - 5, sayfa * 5);
          embed.edit(new MessageEmbed().setDescription(`${member} kişisinin kayıt geçmişini silmek için [❌] emojisine tıklayınız ${member} kişisinin sunucuda tüm \`isim/yaş/kayıt/yetkili/saat\` verileri: \n ${yenisayfa.join("\n")}`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })))
     
     
     
       }
       
       
          if (react.emoji.name == "✅") {
             embed.edit(new MessageEmbed().setDescription(`${member} kişisinin kayıt geçmişini gösteren tablo 5 saniye için de silinecek`)).then(x => x.delete({timeout: 10000}));
             emojiler.stop();
            
            
              } 
       
          
    var kayıtonay = message.channel.awaitMessages((m) => m.author.id == message.author.id && ["onay"].some(cevap => m.content.toLowerCase().includes(cevap)), {
    max: 1,
    time: 30000 
     
    
      }); 
      
          
       if (react.emoji.name == "❌") {               
       embed.edit(new MessageEmbed().setDescription(`**${member} kişisinin kayıt geçmişini silmek istiyorsan \`[onay]\` yazman yeterlidir. İşlem iptali için \`[iptal]\ yazınız.**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })));
     
     
     
    let iptalkayıt = kayıtonay.first();
    if (iptalkayıt.content.toLocaleLowerCase().includes("onay")) {
    const iptalembed = new MessageEmbed()
    .setColor("#6666")
    .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
    .setDescription(`**${member} üyesinin kayıt geçmişişini sikip sildim.****`)
     embed.edit(iptalembed).then(x => x.delete({timeout: 5000}));
    
      
      

  //------------------- data base (İPTAL İŞLEM)-------------------\\
      
       datab.delete(`isimlergösterme2.${member}.toplama`)
      
  //------------------- data base (İPTAL İŞLEM)-------------------\\
    };
        
    };     
             
     })     
  }  
  }
    

  //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["detay", "names"],
    permLevel: 0
};

exports.help = {
    name: "isimler"
}

