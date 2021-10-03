const moment = require("moment");
const Enmap = require('enmap');
const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
require("moment-duration-format");
const { staffrole, adminrole, breakrole } = require("../../config/constants/roles.json");
const { serverID } = require("../../config/main.json")
const { requestbreak } = require("../../config/constants/channel.json");

module.exports = {
    name: "break",
    description: "Staff breaks",
    aliases: [],
    category: "staff", 
    clientPermissions: [],
    userPermissions: [],
    run: (message, data) => {
    message.delete();
    let Prohibited = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle(`Prohibited User`)
        .setDescription(`You have to be a staff member to use this command!`)
    ;
    let stateatime = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle(`Error`)
        .setDescription("Please state for how long you will be on break (e.g 2Days)")
    ;
    let stateareason = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle(`Error`)
        .setDescription("Please state why you are going on break (e.g \"I have to learn for a test\")")
    ;
    let successfullyenteredit = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle(`Success!`)
        .setDescription("Your break request has been added to the queue, please wait for it be approved before actually going on break!")
    ;
    let alreadyononemate = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle(`Error`)
        .setDescription("You are already on break or got one pending, please end your break first or wait for it to be approved or denied!")
    ;
    let statewhojesus = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle(`Error`)
        .setDescription("I'd appreciate it if you'd tell me who's break you want to approve...")
    ;
    let idisincorrectjesuschrist = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle(`Error`)
        .setDescription("The ID you submitted either is not in the database or is not pending a break approval!")
    ;
    let statewhotodenyjesus = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle(`Error`)
        .setDescription("I'd appreciate it if you'd tell me who's break you want to deny...")
    ;
    let idisincorrectdenyjesuschrist = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle(`Error`)
        .setDescription("The ID you submitted either is not in the database or is not pending a break approval!")
    ;
    let youarentonabreak = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle(`Error`)
        .setDescription("You are not currently on break!")
    ;
    let iendedyourbreak = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle(`Welcome back!`)
        .setDescription("I have ended your break, welcome back!")
    ;
    let usageonthiscommand123 = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle(`Request a break`)
        .setDescription(`Request <time (no spaces: 2days)> <reason (away from home on vacation)>`)
    ;
    let youhavetobeinacertainchannelpatternup = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle(`Error`)
        .setDescription(`I'm sorry but you have to be in <#${requestbreak}> to use this!`)
    ;
    if (!staffrole) return msg.reply(Prohibited).then(d => d.delete({ timeout: 7000 })).then(msg.delete({ timeout: 3000 }));
    if (!adminrole && msg.channel.id != requestbreak) return msg.reply(youhavetobeinacertainchannelpatternup).then(d => d.delete({ timeout: 7000 })).then(msg.delete({ timeout: 3000 }));
    const breaksDB = new Enmap({ name: 'breaks' });
    breaksDB.ensure(msg.author.id, { ID: msg.author.id, requestedAt: 'N/A', status: 'N/A', reason: 'N/A', duration: 'N/A'});
    const action = args[0];
    const requestedAt = Date.now();
    const duration = args[1];
    const reason = args.slice(2);
    const breakRole = client.guilds.cache.get(serverID).roles.cache.get(breakrole);
    const breakQueue = client.channels.cache.get(requestbreak);
    if (action && action == 'request') {
        if (breaksDB.get(msg.author.id).status == 'N/A') {
            if (!duration) return msg.reply(stateatime).then(d => d.delete({ timeout: 10000 })).then(msg.delete({ timeout: 3000 }));
            if (reason.length < 2) return msg.reply(stateareason).then(d => d.delete({ timeout: 10000 })).then(msg.delete({ timeout: 3000 }));
            breaksDB.set(msg.author.id, { ID: msg.author.id, requestedAt: requestedAt, status: 'pending', reason: reason.join(' '), duration: duration });
            msg.reply(successfullyenteredit).then(d => d.delete({ timeout: 10000 })).then(msg.delete({ timeout: 3000 }));
            const em = new MessageEmbed()
            .setTitle(`${msg.author.username}'s Break Request`)
            .addField("Duration:", duration)
            .addField("Reason:", reason.join(' '))
            .setFooter(`${msg.author.username}'s ID: ${msg.author.id}`)
            ;
            return breakQueue.send(em);
        } else {
           return msg.reply(alreadyononemate).then(d => d.delete({ timeout: 10000 })).then(msg.delete({ timeout: 3000 }));
        }
    } else if (action && action == 'approve' && adminrole) {
        const thatRequested = args[1];
        if (!thatRequested) return msg.reply(statewhojesus).then(d => d.delete({ timeout: 10000 })).then(msg.delete({ timeout: 3000 }));
        if (!breaksDB.get(thatRequested) && breaksDB.get(thatRequested).status != 'pending') return msg.reply(idisincorrectjesuschrist).then(d => d.delete({ timeout: 10000 })).then(msg.delete({ timeout: 3000 }));
        const oldRequestedAt = breaksDB.get(thatRequested).requestedAt;
        const oldReason = breaksDB.get(thatRequested).reason;
        const oldDuration = breaksDB.get(thatRequested).duration;
        breaksDB.set(thatRequested, { ID: thatRequested, requestedAt: oldRequestedAt, status: 'approved', reason: oldReason, duration: oldDuration });
        client.guilds.cache.get(serverID).member(thatRequested).roles.add(breakRole);
        const em = new MessageEmbed()
        .setTitle(`Approved ${client.users.cache.get(thatRequested).username}'s Break Request`)
        .setColor("GREEN")
        ;
        breakQueue.send(em);
        const confirmEm = new MessageEmbed()
        .setTitle("Your break request has been approved!")
        .setColor("GREEN")
        ;
        return client.users.cache.get(thatRequested).send(confirmEm);
    } else if (action && action == 'deny' && adminrole) {
        const thatRequested = args[1];
        if (!thatRequested) return msg.reply(statewhotodenyjesus).then(d => d.delete({ timeout: 10000 })).then(msg.delete({ timeout: 3000 }));
        if (!breaksDB.get(thatRequested) && breaksDB.get(thatRequested).status != 'pending') return msg.reply(idisincorrectdenyjesuschrist).then(d => d.delete({ timeout: 10000 })).then(msg.delete({ timeout: 3000 }));
        breaksDB.set(thatRequested, { ID: thatRequested, requestedAt: 'N/A', status: 'N/A', reason: 'N/A', duration: 'N/A' });
        const em = new MessageEmbed()
        .setTitle(`Denied ${client.users.cache.get(thatRequested).username}'s Break Request`)
        .setColor("RED")
        breakQueue.send(em);
        const deniedEm = new MessageEmbed()
        .setTitle("Your break request has been denied!")
        .setColor("RED")
        ;
        return client.users.cache.get(thatRequested).send(deniedEm);
    } else if (action && action == 'end') {
        if (breaksDB.get(msg.author.id).status != 'approved') return msg.channel.send({ embeds: [youarentonabreak] });
        breaksDB.set(msg.author.id, { ID: msg.author.id, requestedAt: 'N/A', status: 'N/A', reason: 'N/A', duration: 'N/A' });
        msg.member.roles.remove(breakRole);
        return msg.channel.send({ embeds: [iendedyourbreak] });
    } else {
        return msg.channel.send({ embeds: [usageonthiscommand123] });
    }
  }
}