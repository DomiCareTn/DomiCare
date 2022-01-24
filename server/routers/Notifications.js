const express = require("express");
const router = express.Router();
const Notifications = require("../controllers/Notifications");


router.route("/notifications")
  .get(Notifications.FindAll) 
  

module.exports = router;