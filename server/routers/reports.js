const express = require("express");
const router = express.Router();
const report = require("../controllers/reports.js");

router.route("/reports")
  .post(report.reports) 


module.exports = router;