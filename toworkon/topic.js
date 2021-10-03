  
const moment = require("moment");
const Enmap = require('enmap');
const randomTopic = require('table-topic-generator');
require("moment-duration-format");

module.exports = {
  name: "topic",
  description: "gives you a topic to talk about in chat",
  aliases: [],
  category: "utility", 
  clientPermissions: [],
  userPermissions: [],
  run: (message, data) => {
    const topic = randomTopic(1, "Summer");
    return msg.channel.send(topic);
  }
}