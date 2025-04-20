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
const venuesRoutes = require("./routes/venuesRouter");
const galleryRoutes = require("./routes/galleryRouter");
const sherwaniRoutes = require("./routes/sherwaniRouter");
const achkanRoutes = require("./routes/achkanRouter");
const lehengaRoutes = require("./routes/lehengaRouter");
const sareeRoutes = require("./routes/sareeRouter");
const choreographerRoutes = require("./routes/choreographerRouter");
const weddingBandRoutes = require("./routes/weddingBandRouter");
const DJRoutes = require("./routes/DJRouter");

//routes
app.use("/api/v1",require("./routes"))
app.use("/api/inhouseServices/photographers", photographerRoutes);
app.use("/api/inhouseServices/catering", cateringRoutes);
app.use("/api/inhouseServices/mehendi", mehendiRoutes);
app.use("/api/inhouseServices/decoration", decorationRoutes);
app.use("/api/inhouseServices", serviceRoutes);
app.use("/api/venues", venuesRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/sherwani", sherwaniRoutes);
app.use("/api/achkan", achkanRoutes);
app.use("/api/lehenga", lehengaRoutes);
app.use("/api/saree", sareeRoutes);
app.use("/api/choreographer", choreographerRoutes);
app.use("/api/weddingBand", weddingBandRoutes);
app.use("/api/dj", DJRoutes);

// 404 page
app.use("*",()=>{
    throw new ApiError(404,"Page not found")
})

app.use(HandlingNotFound)

//server
module.exports = app
