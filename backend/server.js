require("dotenv").config({
    path:".env"
})
const app = require("./src/app");
const { ConnectDB } = require("./src/config/db.config")
const photographerRoutes = require("./src/routes/photographerRouter"); // Import the routes

const port = process.env.PORT || 1213
console.log(process.env.JWT_AUTH)

ConnectDB()

app.listen(port,()=>{
    console.log(`the app is listen at http://localhost:${port}`);
} )
