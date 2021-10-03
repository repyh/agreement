const eventLogger = require('../logging')
const Discord = ('discord.js')
// const client = new Discord.Client({
//   intents: 4610, // guild memebers, guild messages, and DM intents
// })
// We don't want to make a new client, so I
// just added a param to the event loader

module.exports = {
  name: "ready",
  runOnce: true,
  call(client) {
    console.log("Successfully logged in!");
    eventLogger(client)
  }
};
