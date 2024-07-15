const express = require("express");
const { connectDb } = require("./db/db");
const urlRouter = require("./Routes/url.js")
const dotenv = require("dotenv");
const URL = require("./models/url.js")


dotenv.config();


const app = express();
const PORT = 3000;

connectDb();
app.use(express.json())

app.get("/", (req , res) => {
    res.send("homepage")
})
app.use("/url", urlRouter);

app.get("/:shortId",async(req, res) => {

    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({ shortId }, {
        $push: {
            VisitedHistory: {
                timeStamp: Date.now()
            },
        }
    });

    res.redirect(entry.redirectedUrl)
    
})

app.listen(3000, () => {
    console.log("server running at " , PORT)
})

