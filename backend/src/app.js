const express = require("express")
const { HandlingNotFound } = require("./middlewares/Handling404.middleware")
const ApiError = require("./utils/ApiError")
const app = express()
const morgan =require("morgan")
const cors = require("cors")
// middlewaress
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use(morgan("dev"))
const serviceRoutes = require("./routes/inhouseServicesRouter");
const photographerRoutes = require("./routes/photographerRouter");
const cateringRoutes = require("./routes/cateringRouter");
const mehendiRoutes = require("./routes/mehendiRouter");
const decorationRoutes = require("./routes/decorationRouter");

//routes
app.use("/api/v1",require("./routes"))
app.use("/api/inhouseServices/photographers", photographerRoutes);
app.use("/api/inhouseServices/catering", cateringRoutes);
app.use("/api/inhouseServices/mehendi", mehendiRoutes);
app.use("/api/inhouseServices/decoration", decorationRoutes);
app.use("/api/inhouseServices", serviceRoutes);

// 404 page
app.use("*",()=>{
    throw new ApiError(404,"Page not found")
})

app.use(HandlingNotFound)

//server
module.exports = app
