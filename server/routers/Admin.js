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
  router.route("/transactions")
  .get(AdminController.get_all_transactions)
  router.route("/quesans")
  .get(AdminController.get_quesans)
  router.route("/deleteEquip/:id")
    .delete(AdminController.delete_equipement)
    router.route("/sp")
  .get(AdminController.get_all_service_Providers)
  router.route("/ss")
  .get(AdminController.get_all_service_Seekers)
router.route("/banned/:id")
  .patch(AdminController.bann_User)
  router.route("/unbanned/:id")
  .patch(AdminController.unbann_User)
  router.route("/bannedSS/:id")
  .patch(AdminController.bann_UserSS)
  router.route("/unbannedSS/:id")
  .patch(AdminController.unbann_UserSS)

  router.route("/admins")
    .get(AdminController.get_all_admins)
  router.route("/verify/:id")
  .patch(AdminController.verify_User)

  
 

module.exports = router;