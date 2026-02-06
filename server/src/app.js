const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("API is running")
})
module.exports = app