const express = require("express")
const app = express()
const cors = require("cors")
const userRoute = require("./src/routes/v1/user.route")
const { landing } = require("./src/controllers/user.controller")
require("dotenv").config()


app.use(cors())
app.use(express.json())
app.use(express.raw())
app.use(express.text())


app.get("/", landing)
app.use("/api/v1/user", userRoute)


app.listen(process.env.PORT || 80)