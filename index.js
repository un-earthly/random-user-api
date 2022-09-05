const express = require("express")
const app = express()
const cors = require("cors")
const userRoute = require("./routes/v1/user.route")
require("dotenv").config()
app.use(cors())
app.use(express.json())
app.use("/v1/user", userRoute)

app.get("/", (req, res) => {
    res.send({ "Avaiable get Routes ": " v1/user/random && v1/user/all" })
})
app.listen(process.env.HOST || 80, () => {
    console.log(`server is running in ${process.env.HOST}`)
})