const express = require("express")
const app = express()
const cors = require("cors")
const { getAllUsers, getRandomUser, addUser, updateUser, bulkUpdateUser, deleteUser } = require("./controllers/user.controller")
require("dotenv").config()
app.use(cors())
app.use(express.json())
// const userRoute = require("./routes/v1/user.route")
// app.use("/v1/user", userRoute)

app.get("/", (req, res) => {
    res.send({ "Avaiable get Routes ": " v1/user/random && v1/user/all" })
})
app.get("/v1/user/all", getAllUsers)
app.get("/v1/user/random", getRandomUser)
app.post("/v1/user/save", addUser)
app.patch("/v1/user/update/:id", updateUser)
app.patch("/v1/user/bulk-update", bulkUpdateUser)
app.delete("/v1/user/delete/:id", deleteUser)
app.listen(process.env.HOST || 80, () => {
    console.log(`server is running in ${process.env.HOST}`)
})