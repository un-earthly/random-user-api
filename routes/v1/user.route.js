const { addUser, bulkUpdateUser, deleteUser, getAllUsers, updateUser, getRandomUser } = require("../../controllers/user.controller");

const router = require("express").Router();


router.get("/all", getAllUsers)
router.get("/random", getRandomUser)
router.post("/save", addUser)
router.patch("/update", updateUser)
router.patch("/bulk-update", bulkUpdateUser)
router.patch("/delete", deleteUser)

module.exports = router;