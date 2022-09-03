const router = require("express").Router();


router
    .route("/")
    .get()
    .post()
    .put()
    .patch()
    .delete();


export default router;