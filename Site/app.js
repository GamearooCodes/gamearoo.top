require("dotenv").config()
var express = require('express');

const { readFileSync } = require("fs");

const app = express();

const DiscordOauth2 = require('discord-oauth2');

const cookieParser = require('cookie-parser');

const serveIndex = require('serve-index')

const path = require("path")

exports.api = (client) => {
    exports.client = client;

    app.enable("trust proxy");
    app.set("etag", false);

    app.use(express.static(__dirname + "/Website"))
    app.set("views", __dirname)
    app.set("view engine", "ejs");
    app.use(cookieParser());

    const staticPath = path.join(__dirname, "ram-api-img")

    app.use('/ram-api-img', express.static(staticPath), serveIndex(staticPath, {'icons': true}));

    const staticPath2 = path.join(__dirname, "cdn")

    app.use('/cdn', express.static(staticPath2), serveIndex(staticPath2, {'icons': true}));

    process.oauth = new DiscordOauth2({
        clientId: process.env.id,
        clientSecret: process.env.secret,
        redirectUri: process.env.redirectURL
    })

    require("../Other/request").load(app)

    app.get('/error', (req, res) => {
        res.status(404).send('404: Page not found');
    });

    app.listen(process.env.port, () => console.log(`started on port ${process.env.port} `));

}