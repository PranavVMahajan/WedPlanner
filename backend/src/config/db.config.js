const mongoose = require("mongoose")

exports.ConnectDB = async()=> {
    try {
        await mongoose.connect("mongodb+srv://wedToMe:Pranav3248@cluster0.axx81.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log(`the DB is connect with ${mongoose.connection.host}`);
    } catch(error) {
        console.log("Disconnected")
        mongoose.disconnect()
        process.exit(1)
        
    }
}
