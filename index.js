const express = require("express")
const app = express()
const cors = require("cors")
const userRoute = require("./routes/v1/user.route")
const { deleteUser, bulkUpdateUser, updateUser, addUser, getRandomUser, getAllUsers } = require("./controllers/user.controller")
require("dotenv").config()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send({ "Avaiable get Routes ": " v1/user/random && v1/user/all" })
})

app.get("/api/v1/all", getAllUsers)
app.get("/api/v1/random", getRandomUser)
app.post("/api/v1/save", addUser)
app.patch("/api/v1/update/:id", updateUser)
app.patch("/api/v1/bulk-update", bulkUpdateUser)
app.delete("/api/v1/delete/:id", deleteUser)
app.listen(process.env.HOST || 80, () => {
    console.log(`server is running in ${process.env.HOST}`)
})