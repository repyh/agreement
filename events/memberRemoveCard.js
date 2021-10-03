const Canvas = require("canvas")
const { welcomechannel123 } = require("../config/constants/channel.json")
module.exports = {
	name: "guildMemberRemove",
	async call(client, args){
			const joinedServer = args[0].guild.members.cache.get(args[0].user.id).joinedAt.toDateString()
          const userCreationDate = args[0].user.createdAt.toDateString()
          const canvas = Canvas.createCanvas(700, 250);
          const ctx = canvas.getContext('2d');
          const background = await Canvas.loadImage(
            path.join('../images/background.png')
          )
          ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
          ctx.strokeStyle = '#74037b';
          ctx.strokeRect(0, 0, canvas.width, canvas.height);
          // Slightly smaller text placed above the member's display name
          ctx.font = '28px sans-serif';
          ctx.fillStyle = '#ffffff';
          ctx.fillText('User has left!', canvas.width / 2.5, canvas.height / 3.5);
          // Add an exclamation point here and below
          ctx.font = applyText(canvas, `${args[0].displayName}!`);
          ctx.fillStyle = '#ffffff';
          ctx.fillText(`${args[0].displayName}`, canvas.width / 2.5, canvas.height / 1.8);
          ctx.beginPath();
          ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.clip();
          const avatar = await Canvas.loadImage(args[0].user.displayAvatarURL({ format: 'jpg' }));
          ctx.drawImage(avatar, 25, 25, 200, 200);
          const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
          welcomechannel123 = client.channels.cache.get(welcomeleave)
          const JoinedServer123 = args[0].guild.members.cache.get(args[0].user.id).joinedAt.toDateString()
          const userCreation1 = args[0].user.createdAt.toDateString()
          var roleObj = args[0].guild.roles.cache.get(roleID);
          const CaptchaLog = new Discord.MessageEmbed()
            .setTitle(`New Member`)
            .addField(`**User:**`, `${args[0].user.tag}`)
            .addField(`**Joined Server at:**`, `${joinedServer}`)
            .addField(`**Account Creation:**`, `${userCreationDate}`)
            .addField(`**Captcha Code:**`, `${userCaptchaData[args[0].id].captchaValue}`)
            .addField(`**Role Given:**`, `${roleObj}`)
            .setColor("RED")
            ;
          if (channelLog) args[0].guild.channels.cache.get(channelLog).send(CaptchaLog);
          welcomechannel123.send(`<@&826137014529032273>, Welcome ${member} to the server!`, attachment);
		}
	}