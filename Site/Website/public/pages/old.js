
const path = require("path")
module.exports = {
    name: '/oldSite',
    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     */
    run: async (req, res) => {
        let args = {
            domain: process.env.domain
        }

        res.render(path.join(__dirname, "../../html/oldSite.ejs"), args)
    }}