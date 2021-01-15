const { MessageEmbed } = require('discord.js')
const datab = require('quick.db')
const ayarlar = require("../ayarlar.json")
const moment = require("moment");
const ms = require('ms')
exports.run = async (client, message, args) => {
  
const sunucu = message.member.guild
  
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
  

 if(!message.member.roles.cache.has(ayarlar.KayıtYetkilisi) && (!message.member.roles.cache.has(ayarlar.üstYetkiliRolü) && (!message.member.hasPermission("ADMINISTRATOR")))) return message.channel.send(new MessageEmbed().setDescription(`**Gerekli yetikiye sahip değilsin.**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 5000}));  

 if(!ayarlar.erkek1) return message.channel.send (new MessageEmbed().setDescription(`**(\`Erkek1\`) Rolü ayarlanmamış.**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));
 if(!ayarlar.erkek2) return message.channel.send (new MessageEmbed().setDescription(`**(\`Erkek2\`) Rolü ayarlanmamış.**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));
 if(!ayarlar.unregister) return message.channel.send (new MessageEmbed().setDescription(`**(\`Kayıtsız\`) Rolü ayarlanmamış.**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000})); 
 if(!ayarlar.tag) return message.channel.send (new MessageEmbed().setDescription(`**(\`TAG\`) sembölü ayarlanmamış.**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));

 //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 

  const kullanici = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
  if(!kullanici) return message.channel.send(new MessageEmbed().setDescription(`**Bir kullanıcı etiketlemelisin.**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 5000}));
    
  if(kullanici.roles.cache.has(ayarlar.erkek1)) return message.channel.send(new MessageEmbed().setDescription(`**Daha önceden kayıt olan birini tekrar kayıt edemezsin.**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));
  if(kullanici.roles.cache.has(ayarlar.erkek2)) return message.channel.send(new MessageEmbed().setDescription(`**Daha önceden kayıt olan birini tekrar kayıt edemezsin.**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));
  if(!kullanici.roles.cache.has(ayarlar.unregister)) return message.channel.send(new MessageEmbed().setDescription(`**Kişide <@&${ayarlar.unregister}> rölü bulunmadığından dolayı kayıt işlemine devam edemiyoruz.**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));
 
  const yaşl = ayarlar.YaşLimit
  if(yaşl === null) yaşl = "14 Yaş Altına Kayıt Yapması Yasaktır."
  if(yaşl === undefined) yaşl = "14 Yaş Altına Kayıt Yapması Yasaktır."
  let isim = args[1]
  let yas = Number(args[2])
  if(yas < ayarlar.YaşLimit) return message.channel.send(new MessageEmbed().setDescription(`**Sunucumuzun yaş sınırı ${yaşl}'tür \n Yaşsınırının Altında Kaldığınız İçin İşlem Yapılmamaktadır.**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 5000}));
  if(kullanici.id === message.author.id) return message.channel.send(new MessageEmbed().setDescription(`**Kendini kayıt edemez.**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 5000}));
  if(kullanici.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(new MessageEmbed().setDescription(`**Bu Kullanıcı senden üst/aynı pozisyonda.**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 5000}));
  if(!isim || !yas) return message.channel.send(new MessageEmbed().setDescription(`**Geçerli isim veya yaş belirtiniz.**`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 5000}));

  kullanici.setNickname(`${ayarlar.tag} ${isim} | ${yas}`)


  //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
  
    //---------------------------------ZAMAN AYARLAMA---------------------------------\\  
  
    let timereplace = args[0];
    let time = timereplace.replace(/y/, ' yıl').replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat') 
    datab.add('case', 1)
    const darkly = await datab.fetch('case')
    var tarih = new Date(Date.now())
    var tarih2 = ms(timereplace)
    var tarih3 = Date.now() + tarih2 +10800000
    let ay = moment(Date.now()+10800000).format("MM")  
    let gün = moment(Date.now()+10800000).format("DD")
    let saat = moment(Date.now()+10800000).format("HH:mm:ss")
    let yıl = moment(Date.now()+10800000).format("YYYY")
    let kayıtsaat = `\`${gün} ${ay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${saat} (${yıl})\``
   
     //---------------------------------ZAMAN AYARLAMA---------------------------------\\  
    
   //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
  
    let kayıtlar = datab.fetch(`yetkili.${message.author.id}.toplam`)
    
    
    let kayıtno = datab.fetch(`kayıtNo.${sunucu.name}`)
  
    
    if(kayıtno === null) kayıtno = "0"
    if(kayıtno === undefined) kayıtno = "0"
  
    
    let toplamisim = datab.fetch(`isimler2.${kullanici.id}.toplam1`);
  
  
    if(toplamisim === null) toplamisim = "0"
    if(toplamisim === undefined) toplamisim = "0"
  
  
    datab.push(`isimlergösterme2.${kullanici.id}.toplama`, {

    İsim: isim , Yas: yas ,  Yetkili: message.author.id , Zaman: kayıtsaat, KayıtNO: `${kayıtno}`});
     
    let isimler = datab.get(`isimlergösterme2.${kullanici.id}.toplama`)
  
    let isimleriyazdır = isimler.filter(vader => vader.userID === isim.id).map(vader => ` • (\`${vader.İsim} | ${vader.Yas}\`) **${vader.Cinsiyet ? vader.Cinsiyet : "Belirleniyor..."}** `)

    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
   
    const embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
    .setDescription(`**${kullanici} üyesinin kayıt işleminin tamamlanması için (\`erkek/kadın/iptal\`) yazmalısın. \n\n (\`${isim} | ${yas}\`) İsim yaş şekilinde kayıt olacak** \n\n <@${kullanici.id}> **Kayıt olma sayısı: [${toplamisim}]**\n\n  ${isimleriyazdır.join("\n")}`)
    .setFooter(`Kullanıcının isim geçmişine bakmak için \`.isimler @vader/id komutunu kullanabilirsiniz\``)
    .setColor("GOLD")
    message.channel.send(embed).then(async mesaj => {
      
   
    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
   
   

    let kayıtonay = await message.channel.awaitMessages((m) => m.author.id == message.author.id && ["erkek", "kadın", "iptal"].some(cevap => m.content.toLowerCase().includes(cevap)), {
    max: 1,
    time: 100000 || datab.delete(`isimlergösterme2.${kullanici.id}.toplama`)
  
    
      });
     if(kayıtonay.size === null) {
      
     const iptalyazı = new MessageEmbed()
    .setColor("#6666")
    .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
    .setDescription(`**${kullanici} üyesinin kayıt işlemi herhangi bir işlem gerçekleşmediğinden iptal oldu**`)
    mesaj.edit(iptalyazı).then(x => x.delete({timeout: 5000}));
    await mesaj.react("✨")
      
     };
  
      
      
  let erkekonay = kayıtonay.first();
  if (erkekonay.content.toLocaleLowerCase().includes("erkek")) {

  kullanici.roles.add(ayarlar.erkek1)
  kullanici.roles.add(ayarlar.erkek2)
  kullanici.roles.remove(ayarlar.unregister)


  const onayembed = new MessageEmbed()
  .setColor("#51adcf")
 .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
 .setDescription(`**${kullanici} üyesine <@&${ayarlar.erkek1}> rolü verildi \n\n Kayıt sıran:   \`${kayıtno}\`**`)
 .setFooter(`Toplam kayıtların: (${kayıtlar})`)
  mesaj.edit(onayembed)
  await mesaj.react("✨")
    
    
    
   //------------------- data base (ONAY İŞLEM) -------------------\\
    
      datab.add(`isimler.${kullanici.id}.toplam1`, 1 );
      datab.add(`yetkili.${message.author.id}.kadın`, 1); 
      datab.add(`yetkili.${message.author.id}.toplam`, 1)  
      datab.add(`kayıtNo.${sunucu.name}`, 1)
      datab.delete(`isimlergösterme2.${kullanici.id}.toplama` ,1)
    
   await datab.push(`isimlergösterme2.${kullanici.id}.toplama`, {
            
    İsim: isim , Yas: yas , Yetkili: message.author.id , Cinsiyet: "ERKEK", Zaman: kayıtsaat, KayıtNO: `${kayıtno}`});
     //------------------- data base (ONAY İŞLEM) -------------------\\ 


  
  //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
    
  client.channels.cache.get(ayarlar.genelChat).send(new MessageEmbed().setAuthor('Aramıza Katıldı !').setDescription(`**${kullanici} Adlı orospu evladı Aramıza katıldı ! hoşgeldin umarım keyifli vakit geçirirsin.**`).setColor('BLUE'))
  
  
  client.channels.cache.get(ayarlar.kayitLog).send(new MessageEmbed().setAuthor(message.author.username, message.author.avatarURL({dynamic: true})).setTitle(`**KAYIT LOG**`)
   .setColor("#00fff8")
        .setDescription(`• **Yetkili:** (<@${message.author.id}>)
        • **Kayıt Edilen:** (<@${kullanici.user.id}>)
        • **Yeni ismi:** (\`${isim} | ${yas}\`)
        • **Kayıt saat:** (\`${kayıtsaat}\`)
        `))
 
 

   const dmmesaj = new MessageEmbed()
  .setColor("")
  .setDescription(`**Selam ${kullanici} , (\`${kayıtsaat}\`) tarihin de (<@${message.author.id}>) tarafından (\`${isim} | ${yas}\`) (\`ERKEK\`) olarak kayıt edildin. KayıtNo: \`${kayıtno}\`**`)
  .setFooter(`Herhangi bir yanlışlık yapıldığını düşünüyorsan kayıt yetkililerimize ulaş.`)
  .setTimestamp()
   kullanici.send(dmmesaj)
   
   }
   
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 


 let kadınonay = kayıtonay.first();
 if (kadınonay.content.toLocaleLowerCase().includes("kadın")) {

  kullanici.roles.add(ayarlar.kadın1)
  kullanici.roles.add(ayarlar.kadın2)
  kullanici.roles.remove(ayarlar.unregister)


  const onayembed = new MessageEmbed()
  .setColor("#51adcf")
 .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
 .setDescription(`**${kullanici} üyesine <@&${ayarlar.erkek1}> rolü verildi \n\n Kayıt sıran:   \`${kayıtno}\`**`)
 .setFooter(`Toplam kayıtların: (${kayıtlar})`)
  mesaj.edit(onayembed)
  await mesaj.react("✨")
    
    
    
   //------------------- data base (ONAY İŞLEM) -------------------\\
    
      datab.add(`isimler.${kullanici.id}.toplam1`, 1 );
      datab.add(`yetkili.${message.author.id}.kadın`, 1); 
      datab.add(`yetkili.${message.author.id}.toplam`, 1)  
      datab.add(`kayıtNo.${sunucu.name}`, 1)
      datab.delete(`isimlergösterme2.${kullanici.id}.toplama` ,1)
    
   await datab.push(`isimlergösterme2.${kullanici.id}.toplama`, {
            
    İsim: isim , Yas: yas , Yetkili: message.author.id , Cinsiyet: "KADIN", Zaman: kayıtsaat, KayıtNO: `${kayıtno}`});

   //------------------- data base (ONAY İŞLEM) -------------------\\


//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
  
client.channels.cache.get(ayarlar.genelChat).send(new MessageEmbed().setAuthor('Aramıza Katıldı !').setDescription(`**${kullanici} Adlı orospu evladı Aramıza katıldı ! hoşgeldin umarım keyifli vakit geçirirsin.**`).setColor('BLUE'))


client.channels.cache.get(ayarlar.kayitLog).send(new MessageEmbed().setAuthor(message.author.username, message.author.avatarURL({dynamic: true})).setTitle(`**KAYIT LOG**`)
 .setColor("#00fff8")
      .setDescription(`• **Yetkili:** (<@${message.author.id}>)
      • **Kayıt Edilen:** (<@${kullanici.user.id}>)
      • **Yeni ismi:** (\`${isim} | ${yas}\`)
      • **Kayıt saat:** (\`${kayıtsaat}\`)
      `))


 const dmmesaj = new MessageEmbed()
.setColor("")
.setDescription(`**Selam ${kullanici} , (\`${kayıtsaat}\`) tarihin de (<@${message.author.id}>) tarafından (\`${isim} | ${yas}\`) (\`KADIN\`) olarak kayıt edildin. KayıtNo: \`${kayıtno}\`**`)
.setFooter(`Herhangi bir yanlışlık yapıldığını düşünüyorsan kayıt yetkililerimize ulaş.`)
.setTimestamp()
 kullanici.send(dmmesaj)
 
 }

 //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
   let iptal = kayıtonay.first();
     if (iptal.content.toLocaleLowerCase().includes("iptal")) {
    datab.delete(`isimlergösterme2.${kullanici.id}.toplama` ,1)
       
    const iptalembed = new MessageEmbed()
    .setColor("#6666")
    .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
    .setDescription(`**${kullanici} üyesinin kayıt işlemini başaramadık abi. ❌**`)
    mesaj.edit(iptalembed).then(x => x.delete({timeout: 5000}));
    await mesaj.react("✨")
      
      

  //------------------- data base (İPTAL İŞLEM)-------------------\\
      
    
      
  //------------------- data base (İPTAL İŞLEM)-------------------\\
      
 }

      
    });
 //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 

  }
  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["register"],
  permLevel: 0
};
exports.help = {
  name: "kayıt",
  description: "",
  usage: ""
};
   