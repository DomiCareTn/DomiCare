const Equipement = require("../models/Equipements.js")
const ServiceProvider = require("../models/ServiceProvider.js");

module.exports = {
     find_Some:(req,res)=>{
          const ownerId = req.params.userID
          Equipement.find({ownerId})
                     .then((result)=> res.send(result))
                     .catch((err)=> console.log(err))
     },
     create_One : (req,res) => {
          console.log(req.body.formData)
          let obj =req.body.formData
          Equipement.create(obj)
          .then((equip)=> res.send(equip))
          .then(()=>console.log(equip))
          .catch((err)=>console.log(err))
     },

  find_All: async (req, res, next) => {
       try {
   
            const Equipements = await Equipement
                 .find({})
            res.status(200).json(Equipements);
       } catch (error) {
            next(error);
       }
  }, find: async (req, res, next) => {
       try {
         
            const Equipements = await Equipement
                
                 .find({ city: { $regex: req.query.city }})
               
          

            res.status(200).json(Equipements);
       } catch (error) {
            next(error);
       }
  },
  findByID:(req,res)=>{

Equipement.find({ownerId : req.params.userID})
.then((equipements)=> res.send(equipements))
.catch((err)=> console.log(err))  
},

  findOne:  (req, res) => {
    
     Equipement.find({'ownerId' : [
          '61dc09dd86961a83ebacb91a']})
     .then((user)=>{
       if(user){
         res.send(user)
       }
       else res.send('user not found')
     })
     .catch((err)=> console.log(err))
 },
 delete_One:
 (req, res, ) => {
     Equipement.findByIdAndRemove({_id:req.params.equipementId})
             .then((result)=> res.send(result))
             .catch((err)=> console.log(err))
   
},
   update_one:(req, res)=>{
    
    
        Equipement.findOneAndUpdate({_id : req.params.equipementsId},req.body.formData,{new:true})
          .then(user=>res.send(user))
          .catch(err => (console.log(err)));
      }, 
      findEquip:  (req, res) => {
       
          Equipement.find({'_id' : [
               '61e13554b50463759e714f04']})
          .then((user)=>{
            if(user){
              res.send(user)
            }
            else res.send('user not found')
          })
          .catch((err)=> console.log(err))
      }
     

}