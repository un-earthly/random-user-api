// const jsonFile = require("")
const fs = require("fs")
module.exports.getAllUsers = (req, res) => {
    const { count } = req.query;
    fs.readFile('data/user.json', 'utf8', (err, data) => {
        if (!err) {

            if (!req.query) {
                res.status(200).send(data)
            }
            console.log(JSON.parse(data))
        }
        else {
            res.status(500).send({ err })
        }


    })
}
module.exports.getRandomUser = (req, res, next) => {

    fs.readFile('data/user.json', 'utf8', (err, data) => {
        // !err ? res.status(200).send(data) : res.status(500).send({ err })

        console.log({ random: "user" })

    })
}
module.exports.addUser = (req, res, next) => {
    console.log(__dirname + "addUser")
    next()

}
module.exports.updateUser = (req, res, next) => {
    console.log(__dirname + "updateUser")
    next()

}
module.exports.bulkUpdateUser = (req, res, next) => {
    console.log(__dirname + "updateUser")
    next()

}
module.exports.deleteUser = (req, res, next) => {
    console.log(__dirname + "deleteUser")
    next()

}