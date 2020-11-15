const Tesseract = require("tesseract.js");
const Discord = require("discord.js");
const config = require("./config.json")
const client = new Discord.Client();
const prefix = "*";

client.on("message", msg => {
	if (!msg.content.startsWith(prefix) || msg.author.bot) return;
	if(msg.content.startsWith(prefix)){
		switch(msg.content.split()[0].replace("*","")){
			case "bruh":
				if(msg.attachments.size){
					msg.channel.startTyping();
					processOCR(msg.attachments.array()[0].url).then((text)=>{
						msg.channel.stopTyping();
						msg.channel.send(text);
					});
				}
				else{
					msg.channel.send("You didnt attach an image bruh")
				}
				break;
			case "gang":
				msg.reply("discordjs is caveman brain");
				break;
		}
	}
});

const processOCR = (filename) => {
	return new Promise((resolve)=>{
		Tesseract.recognize(filename,"eng",)
		.then(({ data: { text } }) => {
			resolve(text);
		})
	});
}

client.login(config.token)
