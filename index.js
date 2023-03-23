const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = ".";

const questions = [
  {
    question: '1+1 چند می شود؟',
    answer: '2'
  },
  {
    question: 'سازنده چت جی پی تی کیست؟(با حروف انگلیسی بنویسید)',
    answer: 'openai'
  },
  {
    question: 'برترین ترکر دیسکورد چیست؟ (حروف انگلیسی)',
    answer: 'top.gg'
  },
  {
    question: 'اولین پادشاه ایران کیست؟',
    answer: "کوروش"
  },
  {
    question: 'بزرگترین کشور دنیا کدام است؟',
    answer: 'روسیه'
  },
  {
    question: 'اسم شما چیست؟',
    answer: `piaz`
  },
  {
    question: 'مقبره کوروش بزرگ در کجا قرار دارد؟',
    answer: 'شیراز'
  }
];
client.on('ready', () => {
  console.log('ready')
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLocaleLowerCase();

  if (command === 'question') {
    const question = questions[Math.floor(Math.random() * questions.length)];
    message.channel.startTyping()
    message.channel.send(question.question);
    const filter = response => {
      return response.author.id === message.author.id;
    };
    message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
      .then(collected => {
        const answer = collected.first().content;
        if (answer.toLowerCase() === question.answer.toLowerCase()) {
          message.channel.send('جواب درست است!');
        } else {
          message.channel.send(`جواب اشتباه است! جواب درست ${question.answer} بود.`);
        }
      })
      .catch(() => {
        message.channel.send('زمان شما به پایان رسید!');
      });
  }
  if(command === 'help') {
    let embed = new Discord.MessageEmbed()
    .setTitle("دستور کمکی")
    .setDescription('من ربات کوییز هستم و احتمالا اگه تو سازنده بات باشی منو از تو گیتهابم دانلود کردی با دیستورات زیر از من استفاده کن')
    .addFields(
      { name:  prefix + "help", value: 'دستور کمکی', inline: true },
      { name: prefix + "about", value: 'دیدن درباره ما', inline: true},
      { name: prefix + "question", value: 'سوال های من'},
      { name: prefix + "chat=", value: 'چت کردن با من', inline: true }
    )
    message.channel.send(embed)
  }
  if (command === 'about') {
    let embedA = new Discord.MessageEmbed()
    .setTitle('درباره ما')
    .setDescription('من یک ربات کوییز تقریبا پیشرفته هستم و میتوانم یک اپلیکیشن کوییز را برای شما شبیه سازی کنم')
    .addFields(
      { name: "گیتهاب", value: 'https://gitub.com/EgGCraftIR', inline: true },
      { name: "سازنده", value: 'just_amirHeHe#0485', inline: true}
    )
    message.channel.send(embedA)
  }
  
});
client.on('guildCreate', guild => {
  const channelID = client.channels.cache.get('') // channel id
  let create = new discord.MessageEmbed
  create.setTitle("من وارد سرور جدید شدم")
  create.addFields(
    { name: "ممبر تعداد", value: `${guild.memberCount} ممبر`, inline: true },
    { name: "تعداد سرور های فعلی", value: `${client.guilds.cache.size} سرور`, inline: true },
    { name: "سازنده سرور", value: `${guild.owner}`, inline: true}
  )
  create.setTumbnail(guild.displayAvatarURL)
  channelID.send(create)
})
client.on("guildDelete", guilds => {
  const channelID = client.channels.cache.get('')
  let pol = new discord.MessageEmbed()
  .setTitle("من از یک سرور حذف  شدم")
  .addFields(
    { name: "ممبر تعداد", value: `${guilds.memberCount} ممبر`, inline: true },
    { name: "تعداد سرور های فعلی", value: `${client.guilds.cache.size} سرور`, inline: true },
    { name: "سازنده سرور", value: `${guild.owner}`, inline: true}
  )
  .setTumbnail(guilds.displayAvatarURL())
  channelID.send(pol)
})
client.login('token')