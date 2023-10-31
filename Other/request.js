const { readdirSync } = require("fs")
const { Application } = require("express");
const { logs } = require("../logs");


/**
 * 
 * @param {Application} app 
 */
exports.load = (app) => {
    readdirSync("./Site/Website/public/").forEach((dir) => {
        const commands2 = readdirSync(`./Site/Website/public/${dir}/`).filter((f) => f.endsWith(".js"));

    for (let file of commands2) {
      let pull = require(`../Site/Website/public/${dir}/${file}`);

      if (!pull.middleware) {
        app.get(pull.name, pull.run);
      } else {
        app.get(pull.name, pull.middleware, pull.run);
      }

      logs.infoAsync(`Loaded page: ${pull.name}`, "Site");
    }
    })
}