const mongoose = require("mongoose")

const connectDb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Mongo DB connected")
    }catch(e){
        console.error("MongoDb not connected",error.message);
        process.exit(1);
    }
}


module.exports = connectDb