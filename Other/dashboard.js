const mongoose = require("mongoose");

const PrefixSchema = new mongoose.Schema({
    userID: String,
    access_token: String,
    refresh_token: String,
    expires_in: Number,
    secretAccessKey: String,
    user: {
        id: String,
        username: String,
        discriminator: String,
        avatar: String
    },
    lastUpdated: {
        type: Number,
        default: Date.now()
    }
});

const MessageModel = (module.exports = mongoose.model("dashboard", PrefixSchema));