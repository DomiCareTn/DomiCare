const express = require("express");
const router = express.Router();
const QuestAns = require("../controllers/Forum");
router.route("/savepost")
    .get(QuestAns.find_All)
  .post(QuestAns.create_One) 
  .put(QuestAns.like_One)
router.route("/findpost/:id")
.get(QuestAns.find_One)
router.route("/findcomments/:id")
.get(QuestAns.find_All_Comments)

router.route("/reply")
 .post(QuestAns.Reply)
module.exports = router;