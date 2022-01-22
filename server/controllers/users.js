const ServiceProvider = require("../models/ServiceProvider.js");
const ServiceSeeker =require("../models/ServiceSeeker.js")
const bcrypt = require("bcrypt");
module.exports = {
  SS_find_One: (req,res)=>{
    console.log(req.params.userId)
    const userId = req.params.userId
    ServiceSeeker.findById({_id : userId})
    .then((user)=>{
      if (user){
        res.send(user)
      }
      else {
       res.send ('user Not found !!')
      }
    })
    .catch((err)=> console.log(err))
  },
  SP_find_One: (req,res)=>{
    console.log(req.params.userId)
    const userId = req.params.userId
    ServiceProvider.findById({_id : userId})
    .then((user)=>{
      if (user){
        res.send(user)
      }
      else {
       res.send ('user Not found !!')
      }
    })
    .catch((err)=> console.log(err))
  },
  SS_Update_One : (req,res)=>{
    ServiceSeeker.findOne({email : req.body.email})
    .then((user)=>{
      if (user){
        res.send('Email adress already exists')
      }
      else {
        ServiceSeeker.findOne({userName : req.body.userName})
                     .then((user)=>{
                       if(user){
                         res.send('Username already exists')
                       }
                       else {
                        ServiceSeeker.updateOne({_id: req.params.userId}, req.body , {new : true})
                        .then((user)=> console.log(user))
                        .catch((err)=> console.log(err))
                       }
                     })
                     .catch(()=>{})
      }
    })
    .catch((err)=> console.log(err))
  },
  SP_Update_One : (req,res)=>{
    ServiceSeeker.findOne({email : req.body.email})
    .then((user)=>{
      if(user){
        res.send('email already exists')
      } else {
        ServiceProvider.findOne({email : req.body.email})
        .then((user)=>{
          if(user){
           res.send('email already exists')
          }
          else {
           ServiceProvider.updateOne({_id: req.params.userId}, req.body , {new : true})
           .then((user)=> res.send(user))
           .catch((err)=> console.log(err))
          }
        })
      }
      
    })
    .catch((err)=>console.log(err))
  },
  SS_UpdatePassword:(req,res)=>{
  
    const data = req.body
    ServiceSeeker.findOne({ _id: req.params.userId })
    .then((user)=> {
     console.log(user)
    
    console.log(user.password)
            bcrypt.compare(data.oldPassword ,user.password)
            .then((success)=>{
                if(success){
                  const passwordHash = bcrypt.hashSync(
                    data.password,
                    10
                );
                ServiceSeeker.findOneAndUpdate({_id:req.params.userId},{password: passwordHash}, {new : true})
                                            .then(() => res.send('success'))
                                            .catch((err) => console.log(err));
                }
                else res.send("Wrong Password !!")
            })
       
            })
            .catch((err)=> console.log(err))
        },

SP_UpdatePassword:(req,res)=>{
  
  const data = req.body
  ServiceProvider.findOne({ _id: req.params.userId })
  .then((user)=> {
   console.log(user)
  
  console.log(user.password)
          bcrypt.compare(data.oldPassword ,user.password)
          .then((success)=>{
              if(success){
                const passwordHash = bcrypt.hashSync(
                  data.password,
                  10
              );
              ServiceProvider.findOneAndUpdate({_id:req.params.userId},{password: passwordHash}, {new : true})
                                          .then(() => res.send('success'))
                                          .catch((err) => console.log(err));
              }
              else res.send("Wrong Password !!")
          })
     
          })
          .catch((err)=> console.log(err))
      },
      SP_FetchAll : (req,res)=>{
        ServiceProvider.find({ type: "serviceProvider" }).populate('posts')
                        .then((users)=> res.send(users))
                        .catch((err)=> console.log(err))
      }
      
}

