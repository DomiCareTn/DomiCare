const express = require("express");
const router = express.Router();
const Transactions = require("../controllers/Transactions");


router.route("/seekersendrequest")
  .post(Transactions.CreateServiceSeekerRequest) 
router.route("/serviceoffers/:_id")
  .get(Transactions.GetReceivedOffers) 
router.route("/OfferMyService")
  .post(Transactions.SendServiceOffer)
  router.route("/servicerequests/:_id")
  .get(Transactions.GetReceivedRequests)
  router.route("/sendedoffers/:_id")
  .get(Transactions.GetSendedOffers)
  router.route("/sendedrequests/:_id")
  .get(Transactions.GetSendedRequests)
  router.route("/deleterequest/:_id")
  .put(Transactions.DeleteRequest)
  router.route("/Canceloffers/:_id")
  .delete(Transactions.CancelOffer)
  router.route("/acceptrequest/:_id")
   .put(Transactions.acceptrequest)
   router.route("/findrequest/:_id")
   .get(Transactions.FindOne)
  
   
module.exports = router;