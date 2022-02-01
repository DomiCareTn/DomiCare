const express = require("express");
const router = express.Router();
const Notifications = require("../controllers/Notifications");


router.route("/Fetch/:userId")
  .get(Notifications.FindAll) 
  router.route("/Seen/:notificationId")
  .put(Notifications.Seen) 

  

module.exports = router;