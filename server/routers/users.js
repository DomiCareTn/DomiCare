const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const UsersController = require("../controllers/users.js");

router.route("/ServiceSeeker/Fetch/:userId").get(UsersController.SS_find_One);
router.route("/ServiceProvider/Fetch/:userId").get(UsersController.SP_find_One);

router
    .route("/ServiceSeeker/Update/:userId")
    .put(UsersController.SS_Update_One);
    router
    .route("/ServiceSeeker/UpdatePassword/:userId")
    .put(UsersController.SS_UpdatePassword);

router
    .route("/ServiceProvider/Update/:userId")
    .put(UsersController.SP_Update_One);

    router
    .route("/ServiceProvider/UpdatePassword/:userId")
    .put(UsersController.SP_UpdatePassword);
module.exports = router;
