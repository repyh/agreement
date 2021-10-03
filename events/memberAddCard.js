const Canvas = require("canvas")
module.exports = {
	name: "guildMemberAdd",
	async call(client, args){
		/*
			args[0] is member
			args[1] is whether to show the card (boolean)
		*/
		if (args[1] && args[1] === true){
			const joinedServer = member.guild.members.cache.get(member.user.id).joinedAt.toDateString()
          const userCreationDate = member.user.createdAt.toDateString()
          const canvas = Canvas.createCanvas(700, 250);
          const ctx = canvas.getContext('2d');
          const background = await Canvas.loadImage(
            path.join('./images/background.png')
          )
          ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
          ctx.strokeStyle = '#74037b';
          ctx.strokeRect(0, 0, canvas.width, canvas.height);
          // Slightly smaller text placed above the member's display name
          ctx.font = '28px sans-serif';
          ctx.fillStyle = '#ffffff';
          ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);
          // Add an exclamation point here and below
          ctx.font = applyText(canvas, `${member.displayName}!`);
          ctx.fillStyle = '#ffffff';
          ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);
          ctx.beginPath();
          ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.clip();
          const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
          ctx.drawImage(avatar, 25, 25, 200, 200);
          const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
          welcomechannel123 = client.channels.cache.get(welcomeleave)
          const JoinedServer123 = member.guild.members.cache.get(member.user.id).joinedAt.toDateString()
          const userCreation1 = member.user.createdAt.toDateString()
          var roleObj = member.guild.roles.cache.get(roleID);
          const CaptchaLog = new Discord.MessageEmbed()
            .setTitle(`New Member`)
            .addField(`**User:**`, `${member.user.tag}`)
            .addField(`**Joined Server at:**`, `${joinedServer}`)
            .addField(`**Account Creation:**`, `${userCreationDate}`)
            .addField(`**Captcha Code:**`, `${userCaptchaData[member.id].captchaValue}`)
            .addField(`**Role Given:**`, `${roleObj}`)
            .setColor("ORANGE")
            ;
          if (channelLog) member.guild.channels.cache.get(channelLog).send(CaptchaLog);
          welcomechannel123.send(`<@&>, Welcome ${member} to the server!`, attachment);
		}
	}
}