const express = require("express")
const cors = require("cors")
const userRoutes = require("./routes/userRoutes")
const app = express()

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))

app.use(express.json());


app.use("/api",userRoutes)
module.exports = app