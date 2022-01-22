const QuestAns = require("../models/Question&Answers");

module.exports = {

  create_One: async (req, res, next) => {
    console.log('comment req body',req.body)
    const { 
      postId,
      owner,
      title,
      content,
      likesCount,
      comments,
      type} =
      req.body;
    
    try {
      const Quest = await QuestAns.create({
        postId,
        owner,
        title,
        content,
        likesCount,
        comments,
        type
      });
      console.log('res',Quest)
      res.status(200).json(Quest);
    } 
    
    catch (error) {
      next(error);
    }
  },
  find_All: async (req, res, next) => {
    try {
      const Quests = await QuestAns.find({type:"Quest"}).sort({createdAt: -1}).exec();
         
      res.status(200).json(Quests);
    } catch (error) {
      next(error);
    }
  },
  find_All_Comments: async (req, res, next) => {
    try {
      
      const com = await QuestAns.find({ postId : req.params.id}).exec();
         
      res.status(200).json(com);
    } catch (error) {
      next(error);
    }
  },
  find_One: async (req, res, next) => {
    console.log(req.params.id)
    try {
      
      const postFound = await QuestAns.findById({ _id: req.params.id });
      console.log(postFound)
      res.status(200).json(postFound);
    } catch (error) {
      next(error);
    }
  },
  update_One: async (req, res, next) => {
    console.log("request", req.body);
    try {
      const event = await QuestAns.findByIUpdate(
        { _id: req.body._id },
        { $push: { comments: req.body.comment } },
        { new: true }
      );
      res.status(200).json(event);
    } catch (error) {
      next(error);
    }
  },
  Reply: async (req, res, next) => {
    console.log("request", req.body.rep);
    try {
      const event = await QuestAns.findByIdAndUpdate(
        
        { _id: req.body.rep.commentid},
        { $push: { comments: req.body.rep } },
        { new: true }
      );
      res.status(200).json(event);
    } catch (error) {
      next(error);
    }
  },
  remove_One: async (req, res, next) => {
    console.log('deletepost',req.body)
    try {
      const removedEvent = await QuestAns.delete({_id: req.body._id});
      res.status(200).json(removedEvent);
    } catch (error) {
      next(error);
    }
  },
  delete_comment: async (req, res, next) => {
   
    try {
      const removedComment = await QuestAns.findOneAndUpdate({_id:req.body._id}, {$pull : {comments:req.body.comment}});
      res.status(200).json(removedComment);
    } catch (error) {
      next(error);
    }
  },
  like_One: async (req, res, next) => {
    
    if(req.body.action==='inc')
    
   { console.log('inc')
     try {
       
      const Quest = await QuestAns.findOneAndUpdate(
        { _id: req.body.postid },{"$push" : {"participants": req.body.userid}},{new : true});
      
      res.status(200).json(Quest);
    } catch (error) {
      console.log(err)
      // next(error);
    }
  }
  else if(req.body.action==='déc'){
    console.log('dec')
    try {
      const Quest = await QuestAns.findByIdAndUpdate(
        { _id: req.body.postid },{"$pull": {"participants": req.body.userid}},{new : true});
      res.status(200).json(Quest);
    } catch (error) {
      console.log(err)
      // next(error);
    }
  }
  }
};
