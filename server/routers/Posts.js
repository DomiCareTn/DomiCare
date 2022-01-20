const express = require("express");
const router = express.Router();
const Posts = require("../controllers/Posts");


router.route("/CreateServiceSeekerPost")
  .post(Posts.CreateServiceSeekerPost) 
  
router.route("/serviceProvidersList")
  .get(Posts.FindAllServiceProviders) 

router.route("/servicesrequests")
  .get(Posts.FindAllServiceSeekerPosts) 

module.exports = router;