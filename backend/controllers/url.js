const shortid = require("shortid");
const URL = require("../models/url.js")
const generateNewUrl = async (req, res) => {
    
    const body = req.body;
    if(!body) return res.status(404).json({error:"URL IS REQUIRED"})
    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectedUrl: body.url,
        VisitedHistory:[]
    })
    return res.json({id: `http://localhost:3000/${shortID}`})
}

module.exports = {
    generateNewUrl,
}