const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        unique: true,
        required: true,
    },
    redirectedUrl: {
        type: String,
        required: true,
        
    },
    VisitedHistory: [{
        timeStamp: { type: Number }
        
    }]
},
    { timestamps: true });


const url = mongoose.model('URL', urlSchema)

module.exports = url