const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/admin.js");



router.route("/adminLogin")
  .post(AdminController.login) 
router.route("/getposts")
  .get(AdminController.get_all_posts)
router.route("/postdeletedId/:id")
  .delete(AdminController.delete_post)
router.route("/reports")
  .get(AdminController.get_reports)
  router.route("/equipement")
  .get(AdminController.get_equipement)
  router.route("/quesans")
  .get(AdminController.get_quesans)
  router.route("/equipdeletedId/:id")
  .delete(AdminController.delete_equipement)

module.exports = router;