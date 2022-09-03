const { addUser, addUsers, deleteUser, getAllUsers, updateUser } = require("../../controllers/user.controller");

const router = require("express").Router();


router
    .route("/")
    .get(getAllUsers)
    .post(addUser)
    .post(addUsers)
    .patch(updateUser)
    .delete(deleteUser);


module.exports = router;