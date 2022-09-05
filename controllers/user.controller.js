const fs = require("fs")
module.exports.getAllUsers = (req, res) => {
    // const { count } = req.query;
    fs.readFile('data/user.json', 'utf8', (err, data) => {
        // if (!err) {

        //     if (!req.query) {
        // res.status(200).send(data)
        //     }
        //     console.log(JSON.parse(data))
        // }
        // else {
        //     res.status(500).send({ err })
        // }

        !err ? res.status(200).send(data) : res.status(500).send({ err })
    })
}
module.exports.getRandomUser = (req, res) => {

    fs.readFile('data/user.json', 'utf8', (err, data) => {
        const { users } = JSON.parse(data)
        const random = Math.floor(Math.random() * (users.length))
        res.send({ random: users[random] })

    })
}
module.exports.addUser = (req, res, next) => {
    fs.readFile('data/user.json', 'utf8', (err, data) => {
        let dataArray = JSON.parse(data);
        dataArray['users'].push(req.body);
        fs.writeFile("data/user.json", JSON.stringify(dataArray), (err) => {
            !err ? res.send(dataArray) : res.send(err)
        })

    })

}
module.exports.updateUser = (req, res, next) => {
    const { gender, name, contact, address, photoUrl } = req.body
    const pid = req.params.id
    if (Object.entries(req.body).length === 0) {
        return res.status(400).send({ err: 'No Data found in request body to update User' })
    }

    fs.readFile('data/user.json', 'utf8', (err, data) => {
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
            fs.writeFile("data/user.json", JSON.stringify(dataArray), (err) => {
                !err ? res.send(dataArray) : res.send(err)
            })
        }

    })

}
module.exports.bulkUpdateUser = (req, res, next) => {
    const toUpdate = req.body

    if (Object.entries(toUpdate).length === 0) return res.status(400).send({ err: 'No Data found in request body to update User' })

    const usersIdsArray = toUpdate.map(user => user.id)
    if (!usersIdsArray) return res.status(411).send({ err: 'No Id found in request body to update Users' })
    fs.readFile('data/user.json', 'utf8', (err, data) => {
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
            fs.writeFile("data/user.json", JSON.stringify(dataArray), (err) => {
                !err ? res.send(dataArray) : res.send(err)
            })

        }



    })
}
module.exports.deleteUser = (req, res, next) => {
    const pid = req.params.id

    fs.readFile('data/user.json', 'utf8', (err, data) => {
        let dataArray = JSON.parse(data);
        const users = dataArray['users']
        const newUsers = users.filter(user => user.id !== pid);
        dataArray = newUsers
        fs.writeFile("data/user.json", JSON.stringify(dataArray), (err) => {
            !err ? res.send(dataArray) : res.send(err)
        })

    })

}