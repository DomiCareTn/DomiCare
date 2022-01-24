const QuestAns = require("../models/Question&Answers");

module.exports = {
  Delete:(req,res)=>{
    QuestAns.deleteOne({_id: req.params.postID})
    .then(()=> QuestAns.find({type:"Quest"}).sort({createdAt: -1}).exec()
    .then((Quests)=> res.send(Quests))
    )
    .catch((err)=> console.log(err))
  },
  DeleteComment:(req,res)=>{
    
    QuestAns.deleteOne({_id: req.params.commentID})
    .then(()=>{
      QuestAns.find({type:"comment", postId:req.params.postID}).sort({createdAt: -1}).exec()
              .then((result)=>{
                console.log(result)
                res.send(result)})
              .catch((err)=> console.log(err))
    })
    .catch((err)=> console.log(err))
  },
  create_One:  (req, res) => {
    const obj = req.body.obj
    QuestAns.create(req.body.obj)
    .then(()=> QuestAns.find({type:"Quest"}).sort({createdAt: -1}).exec()
    .then((Quests)=> res.send(Quests)))
    .catch((err)=> console.log(err))
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
      
      const com = await QuestAns.find({ postId : req.params.id}).sort({createdAt: -1}).exec();
         
      res.status(200).json(com);
    } catch (error) {
      next(error);
    }
  },
  find_One: async (req, res, next) => {
    try {
      
      const postFound = await QuestAns.findById({ _id: req.params.id });
      console.log(postFound)
      res.status(200).json(postFound);
    } catch (error) {
      next(error);
    }
  },
  update_One: async (req, res, next) => {
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
  like_One: async (req, res) => {
    
    if(req.body.action==='inc')
    
   { console.log('inc')
     try {
       
      const Quest = await QuestAns.findOneAndUpdate(
        { _id: req.body.postid },{"$push" : {"participants": req.body.userid}},{new : true});
      console.log("quest",Quest);
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
