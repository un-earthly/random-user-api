const express = require("express")
const app = express()
const cors = require("cors")
// const userRoute = require("./routes/v1/user.route")
// const { deleteUser, bulkUpdateUser, updateUser, addUser, getRandomUser, getAllUsers } = require("./controllers/user.controller")
const fs = require("fs")
require("dotenv").config()
app.use(cors())
app.use(express.json())
app.use(express.raw())
app.use(express.text())

app.get("/", (req, res) => {
    res.send({ "Avaiable get Routes ": " api/v1/random && api/v1/all" })
})

app.get("/api/v1/all", (req, res) => {
    fs.readFile('user.json', 'utf8', (err, data) => {
        !err ? res.status(200).send(data) : res.status(500).send({ err })
    })
})
app.get("/api/v1/random", (req, res) => {

    fs.readFile('user.json', 'utf8', (err, data) => {
        if (!err) {
            const { users } = JSON.parse(data)
            const random = Math.floor(Math.random() * (users.length))
            res.send({ random: users[random] })
        }

        else {
            res.send({ err })
        }

    })
})
app.post("/api/v1/save", (req, res) => {
    fs.readFile('user.json', 'utf8', (err, data) => {
        if (!err) {
            let dataArray = JSON.parse(data);
            req.body.id = require('crypto').randomBytes(12).toString('hex');
            dataArray['users'].push(req.body);
            fs.writeFile("user.json", JSON.stringify(dataArray), (err) => {
                !err ? res.send(dataArray) : res.send(err)
            })
        }
        else {

            res.send({ err })
        }

    })

})
app.patch("/api/v1/update/:id", (req, res) => {
    const { gender, name, contact, address, photoUrl } = req.body
    const pid = req.params.id
    if (Object.entries(req.body).length === 0) {
        return res.status(400).send({ err: 'No Data found in request body to update User' })
    }

    fs.readFile('user.json', 'utf8', (err, data) => {
        if (!err) {
            let dataArray = JSON.parse(data);
            const users = dataArray['users'];
            const user = users.find(user => user.id === pid);
            var userIndex = users.indexOf(user);
            if (gender) {
                user.gender = gender
            }
            if (name) {
                user.name = name
            }
            if (contact) {
                user.contact = contact
            }
            if (address) {
                user.address = address
            }
            if (photoUrl) {
                user.photoUrl = photoUrl
            }

            if (userIndex !== -1) {
                users[userIndex] = user;
                fs.writeFile("user.json", JSON.stringify(dataArray), (err) => {
                    !err ? res.send(dataArray) : res.send(err)
                })
            }
        }
        else {

            res.send({ err })
        }
    })

})
app.patch("/api/v1/bulk-update", (req, res) => {
    const toUpdate = req.body

    if (Object.entries(toUpdate).length === 0) return res.status(400).send({ err: 'No Data found in request body to update User' })

    const usersIdsArray = toUpdate.map(user => user.id)
    if (!usersIdsArray) return res.status(411).send({ err: 'No Id found in request body to update Users' })
    fs.readFile('user.json', 'utf8', (err, data) => {
        if (err) return res.status(500).send({ err })

        let dataArray = JSON.parse(data);
        const users = dataArray['users'];
        const filteredUsers = users.filter(function (user) {
            return toUpdate.filter(function (u) {
                return u.id == user.id;
            }).length !== 0
        })
        const usersIndex = filteredUsers.map(user => users.indexOf(user))


        toUpdate.map((user, index) => {

            if (user.gender) {
                filteredUsers[index].gender = user.gender
            }
            if (user.name) {
                filteredUsers[index].name = user.name
            }
            if (user.contact) {
                filteredUsers[index].contact = contact
            }
            if (user.address) {
                filteredUsers[index].address = user.address
            }
            if (user.photoUrl) {
                filteredUsers[index].photoUrl = user.photoUrl
            }

        })

        if (usersIndex.length !== 0) {
            for (let i = 0; i < usersIndex.length; i++) {
                usersIndex[i] = filteredUsers[i]
            }
            fs.writeFile("user.json", JSON.stringify(dataArray), (err) => {
                !err ? res.send(dataArray) : res.send({ err })
            })

        }



    })
})
app.delete("/api/v1/delete/:id", (req, res) => {
    const pid = req.params.id

    fs.readFile('user.json', 'utf8', (err, data) => {
        if (err) return res.status(400).send({ err: 'No Data found ' })
        let dataArray = JSON.parse(data);
        const users = dataArray['users']
        const newUsers = users.filter(user => user.id !== pid);
        dataArray = newUsers
        fs.writeFile("user.json", JSON.stringify(dataArray), (err) => {
            !err ? res.send(dataArray) : res.send({ err })
        })

    })

})
app.listen(process.env.PORT || 80)