const mongoose = require("mongoose")

const connectDb = async ()=>{
    try{
        const uri = process.env.MONGODB_URL || process.env.MONGO_URI;
        await mongoose.connect(uri)
        console.log("Mongo DB connected")
    }catch(e){
        console.error("MongoDb not connected", e.message);
        process.exit(1);
    }
}


module.exports = connectDb