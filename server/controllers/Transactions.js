const Transactions = require("../models/Transactions");
const Notifications = require ("../models/Notifications");
const e = require("express");
module.exports = {
  CreateServiceSeekerRequest: async (req, res) => {
    const {
      seekerId,
      providerId,
      adress,
      details,
      selectedStartDate,
      selectedEndDate,
      file,
      type,
    } = req.body;
    try {
      const RequestService = await Transactions.create({
        seekerId,
        providerId,
        adress,
        details,
        selectedStartDate,
        selectedEndDate,
        file,
        type,
      });
      const not =await Notifications.create({
        sender:seekerId,
        receiver_id:providerId,
        content :"You received a new service request",
        type: " new request",
        reqoffId:RequestService._id

      })
      res.send(RequestService);
    } catch (err) {
      res.send(err);
    }
  },
  FindOne:async(req,res)=>{
    try {
      const request=await Transactions.findById(
        {_id:req.params._id}
      ).populate('seekerId')


      
      res.send(request)
      console.log("request",request);
    }
    catch(err){
      console.log(err);
    }
  },
  GetReceivedOffers: async (req, res) => {
    try {
      const offers = await Transactions.find(
        {
          type: "offer",
        },
        {
          seekerId: req.params._id,
        }
      ).populate('providerId')
      console.log('offers',offers);
      res.send(offers);
    } catch (err) {
      res.send(err);
    }
  },
  SendServiceOffer: async (req, res) => {
    console.log("first",req.body);
    
    try {
      const offer = await Transactions.create({
        type:req.body.type,
        postid:req.body.postid,
        providerId:req.body.providerId,
        seekerId:req.body.seekerId,
      });
      const not = await Notifications.create({
        reqoffId:req.body.postid,
        type:req.body.type,
        sender:req.body.providerId,
        receiver_id:req.body.seekerId._id,
        content:req.body.content
      })
      
       res.send(not);
       
    } 
    catch (err) {
      console.log(err);
      res.send(err);
    }
  },
  GetReceivedRequests: async (req, res) => {
    console.log("aaaaaa");
    try {
      const offers = await Transactions.find({
        type: "request",
        providerId: req.params._id,
      }).populate('seekerId')
      res.send(offers);
      console.log("offers", offers);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  },
  GetSendedOffers: async (req, res) => {
      console.log("hello offers", req.params._id);
      
    try {
      const offers = await Transactions.find({
        providerId: req.params._id,
      });
      res.send(offers);
    } catch (err) {
      res.send(err);
    }
  },
  GetSendedRequests: async (req, res) => {
    console.log("first", req.params._id);

    try {
      const offers = await Transactions.find({
        type: "request",
        seekerId: req.params._id,
      }).populate("providerId")
      res.send(offers);
    } catch (err) {
      res.send(err);
    }
  },
  DeleteRequest: async (req, res) => {
    console.log("cancel",req.body.sender);

    try {
      const notification=await Notifications.create({
        providerId:req.body.provider_id,
        receiver_id:req.body.sender,
        sender:req.body.Sender,
        createdAt:req.body.createdAt,
        content:req.body.content,
        type:req.body.type
      });
      const deleted =await Notifications.findOneAndDelete({_id:req.body.id});
      
      const transaction=await Transactions.findOneAndDelete({ _id: req.params._id });
      res.send();
    } catch (error) {
      console.log(error);
    }
  },
  CancelOffer :async(req,res)=>{
    
    try{
      console.log("req",req.body);
      const notification=await Notifications.create({
        providerId:req.body.provider_id,
        sender:req.body.sender,
        createdAt:req.body.createdAt,
        content:req.body.content,
        type:req.body.type

      });
      const cancelledOffer=await Transactions.findByIdAndDelete({_id:req.params._id})
      res.send(cancelledOffer)
    }
    catch(err){
      console.log(err);
    }
  },
acceptrequest: async (req, res) => {
    console.log("cancel");

    try {
      const notification=await Notifications.create({
        providerId:req.body.provider_id,
        receiver_id:req.body.sender,
        sender:req.body.Sender,
        createdAt:req.body.createdAt,
        content:req.body.content,
        type:"Accepted request"
      });
      
      const transaction=await Transactions.findByIdAndUpdate({ _id: req.params._id },{status:"Confirmed"});
      res.send();
    } catch (error) {
      console.log(error);
    }
  }, 
 
  
};
