require('dotenv').config();
const { Client, GatewayIntentBits, ActivityType } = require("discord.js");
const { logs } = require("./logs");
const mongoose = require("mongoose");

const client = new Client({intents: GatewayIntentBits.Guilds})
mongoose
.connect(process.env.dbURL)
.then(logs.infoAsync("Mongo Activated.. On Bot!", "Database"));

client.on("ready", () => {
    client.user.setActivity({name: "over gamearoo.top", type: ActivityType.Watching})
    require("./Site/app").api(client)
    logs.infoAsync("Online", "bot")
})

client.login(process.env.token)