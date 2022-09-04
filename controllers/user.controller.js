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
        const dataArray = JSON.parse(data)
        const random = Math.floor(Math.random() * (dataArray.length))
        res.send({ random: dataArray[random] })

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
    console.log(__dirname + "updateUser")
    next()

}
module.exports.deleteUser = (req, res, next) => {
    console.log(__dirname + "deleteUser")
    next()

}