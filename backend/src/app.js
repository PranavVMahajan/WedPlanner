const express = require("express")
const { HandlingNotFound } = require("./middlewares/Handling404.middleware")
const ApiError = require("./utils/ApiError")
const app = express() 

//routes
app.use("/api",require("./routes"))

app.use("*",()=>{
    throw new ApiError(404,"Page not Found")
})

app.use(HandlingNotFound)

module.exports = app