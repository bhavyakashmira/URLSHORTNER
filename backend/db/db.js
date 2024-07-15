const mongoose = require("mongoose")


 const connectDb = async() => {
    try {
        
       const con = await mongoose.connect(process.env.MONGODB_URL)
    } catch (error) {
        console.log("error", error);
        process.exit(1);
    }
}

module.exports = { connectDb }