const Posts = require("../models/Posts");
const ServiceProviders = require("../models/ServiceProvider")

module.exports = {

    FindAllServiceProviders:(req,res)=>{
        ServiceProviders.find({type:"serviceProvider"})
                .then((result)=>{
                  console.log('FindAllServiceProviders', result)
                  res.send(result)})
                .catch((err)=>console.log(err))
      },    
      FindAllServiceSeekerPosts:(req,res)=>{
        console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh')
        Posts.find({type:"request"})
                .then((result)=>{
                  console.log('FindAllServiceSeekerPosts', result)
                  res.send(result)})
                .catch((err)=>console.log(err))
      },
      CreateServiceSeekerPost:async (req, res, next) => {
        

        console.log('create a post');
        
        
        try {
          const Post = await Posts.create({
            serviceSeeker_id:req.body.seekerId,
            content:req.body.details,
            city:req.body.selectedValue,
            startDate:req.body.selectedStartDate,
            endDate:req.body.selectedEndDate,
            adress:req.body.adress,
            file:req.body.file,
            type: "request",
            user:req.body.user
          });
          console.log('CreateServiceSeekerPost',Post)
          res.status(200).json(Post);
        } 
        
        catch (error) {
          next(error);
        }
      }
}