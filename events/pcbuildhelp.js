const { pcbuildhelp } = require("../config/constants/api.json")
const fetch = require('node-fetch');
const Discord = require('discord.js');
const { Color } = require("../config/constants/other.json")


module.exports = {
    name: "pcpartpicker",
    async call(client, args){
        client.on("message", function (message) {
            console.log(`message is created -> ${message}`); /// doesnt log, prob because i fucked it up
            const partId = ((link) => {
                if (link.test(/(https:\/\/([a-z]*).pcpartpicker.com\/list\/)+([a-zA-Z0-9]*)/)) {
                    var ls = link.split(/\//);
                    return ls[ls.length - 1]
                } else {
                    return -1
                }
            })(link).then(data => {
                fetch(`https://japi.rest/pcpartpicker/v1/list/${partId}`, {
                    headers: {
                        "Authorization": `${pcbuildhelp}`
                    }
                }).then(res => res.json())
                const cpuData = data.data.find(m => m.component.name == 'CPU');
                const mbData = data.data.find(m => m.component.name == 'Motherboard');
                const ramData = data.data.find(m => m.component.name == 'Memory');
                const storageData = data.data.find(m => m.component.name == 'Storage');
                const caseData = data.data.find(m => m.component.name == 'Case');
                const powerData = data.data.find(m => m.component.name == 'Power Supply');
                const gpuData = data.data.find(m => m.component.name == 'GPU');
                const embed = new Discord.MessageEmbed()
                    .setColor("PURPLE")
                    .addField('CPU', `[${cpuData.selection.name}](${cpuData.selection.link})`, true)
                    .addField('Motherboard', `[${mbData.selection.name}](${mbData.selection.link})`, true)
                    .addField('Graphics Card', `[${gpuData.selection.name}](${gpuData.selection.link})`, true)
                    .addField('Memory', `[${ramData.selection.name}](${ramData.selection.link})`, true)
                    .addField('Storage', `[${storageData.selection.name}](${storageData.selection.link})`, true)
                    .addField('Case', `[${caseData.selection.name}](${caseData.selection.link})`, true)
                    .addField('Power Supply', `[${powerData.selection.name}](${powerData.selection.link})`, true)
                    .setFooter(`Price: ${data.data.reduce((acc, cur) => acc += Number(cur.price.total.replace(/\$|No Prices Available/g, '')), 0).toFixed(2).toLocaleString()}`)
                message.channel.send({embeds: [embed]});
            })
        })
}
}
