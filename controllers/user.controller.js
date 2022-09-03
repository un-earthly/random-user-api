// const jsonFile = require("")
const fs = require("fs")
module.exports.getAllUsers = (req, res, next) => {

    fs.readFile('data/user.json', 'utf8', (err, data) => {
        // if (error) {
        //     console.log(error);
        //     return;
        // }
        // console.log(JSON.parse(data));
        !err ? res.status(200).send(data) : res.status(500).send({ err })

    })
}
module.exports.addUser = (req, res, next) => {
    // fs.readFile(__dirname)
    console.log(__dirname + "addUser")
    next()

}
module.exports.addUsers = (req, res, next) => {
    // fs.readFile(__dirname)
    console.log(__dirname + "addUsers")
    next()

}
module.exports.updateUser = (req, res, next) => {
    // fs.readFile(__dirname)
    console.log(__dirname + "updateUser")
    next()

}
module.exports.deleteUser = (req, res, next) => {
    // fs.readFile(__dirname)
    console.log(__dirname + "deleteUser")
    next()

}