const jwt = require("jsonwebtoken");
const path = require("path")
const dashboardScema = require('../../../../Other/dashboard');
const { client } = require("../../../app");
module.exports = {
    name: '/',
    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     */
    run: async (req, res) => {
        let args = {
            domain: process.env.domain,
        }

        

        if (!req.cookies.token) return res.render("./Website/html/home.ejs", args)
        let decoded;
        try {
            decoded = jwt.verify(req.cookies.token, process.env.se);
        } catch (error) {

        }

        if (decoded) {
            let data = await dashboardScema.findOne({ _id: decoded.uuid, userID: decoded.userID });

            let user = await client.users.fetch(data.userID).catch(err => {
                res.redirect(`/logout`)
            });


            let args2 = {
                domain: process.env.domain,
                user: user

            }

            res.render(path.join(__dirname, "../../html/dash.ejs"), args2)
        } else {
            res.render(path.join(__dirname, "../../html/home.ejs"), args)
        }
        
    }}