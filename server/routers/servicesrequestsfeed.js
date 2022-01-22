const express = require("express");
const router = express.Router();
const servicesrequests = require("../controllers/servicesRequestsFeed");
router.route("/servicesrequests")
.get(servicesrequests.findAll)
   
module.exports = router;