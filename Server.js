const db = require("quick.db");
const discord = require("discord.js");
const client = new discord.Client({ disableEveryone: true });
client.login(process.env.TOKEN);
const fetch = require("node-fetch");
const fs = require("fs");
require("express")().listen(1343);
const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log("Pinglenmedi.");
  response.sendStatus(200);
});

app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

client.on('ready', () => {
   client.user.setActivity(`e.upyardım | e.uptime | e.göster`);
})


setInterval(() => {
  var links = db.get("linkler");
  if (!links) return;
  var linkA = links.map(c => c.url);
  linkA.forEach(link => {
    try {
      fetch(link);
    } catch (e) {
      console.log("" + e);
    }
  });
  console.log("Pinglendi.");
}, 60000);

client.on("ready", () => {
  if (!Array.isArray(db.get("linkler"))) {
    db.set("linkler", []);
  }
});

//embed hazırlıkları

const help = new discord.MessageEmbed()
.setFooter("TryHard Uptime")
.setColor("#000000")
.setDescription(`Selamlar, botunu uptime etmek için yapman gereken adımları sana söyleyeceğim. \n Artık kolay bir şekilde botunu 7/24 aktif edebilirsin! \n\n📜 Botunu uptime etmek için \n e.uptime\` yazabilirsin, Nasıl yapıldığını komutu yazdığında göreceksin \n 📜 Uptime edilen botların sayısını görmek için \`e.göster\` yazabilirsin. \n 📜 Eğer Botunu Uptimeden Kaldırmak İstiyorsan Kurucumuza Ulaşabilirsin.`)
.setImage("https://cdn.discordapp.com/attachments/794849898175791104/794866839938400256/standard.gif")






client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "t!uptime") {
    var link = spl[1];
    fetch(link)
      .then(() => {
        if (
          db
            .get("linkler")
            .map(z => z.url)
            .includes(link)
        )
             return message.channel.send(new discord.MessageEmbed().setFooter("Escuire Uptime Bot").setColor("#000000").setDescription("Projeniz Sistemimizde Zaten Bulunuyor Eğer Şüpheniz Varsa Sahibime Ulaşabilirsin."));
        message.channel.send(new discord.MessageEmbed().setFooter("Escuire Uptime Bot").setColor("#000000").setDescription("Projeniz Sistemimize Başarıyla Eklendi,Eğer Çalışmıyor İse Sahibime Ulaşabilirsin."));
        db.push("linkler", { url: link, owner: message.author.id });
      })
      .catch(e => {
        return message.channel.send(new discord.MessageEmbed().setFooter("Escuire Uptime Bot").setColor("#000000").setDescription("Lütfen Bir Link Giriniz, \n Glitch Projenize Girin, Sol Yukardaki Show Butonuna Tıklayıp İn A Window Butonuna Basın, Çıkan Sayfanın Linkini Kopyalayıp e.uptime komutunu kullanın. \n Not: Eğer Linki Doğru Girdiğin Halde Bu Hatayı Alıyorsan Sahibime Ulaş."));
      });
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "e.göster") {
    var link = spl[1];
    message.channel.send(new discord.MessageEmbed().setFooter("Escuire Uptime Bot").setColor("#000000").setDescription(`${db.get("linkler").length} Tane Proje Anlık Olarak Aktif Tutuluyor!`));
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "e.upyardım") {
    var link = spl[1];
    message.channel.send(help);
  }
});
