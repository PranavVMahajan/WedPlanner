const mongoose = require("mongoose")

exports.ConnectDB = async()=> {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`the DB is connect with ${mongoose.connection.host}`);
    } catch(error) {
        console.log("Disconnected")
        mongoose.disconnect()
        process.exit(1)
        
    }
}
