const Equipement = require("../models/Equipements.js")
const ServiceProvider = require("../models/ServiceProvider.js");

module.exports = {
     create_One : (req,res) => {
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
       // get all the users
       try {
         
            const Equipements = await Equipement
                 //{fullname:"/"+req.query.fullname+"/",city:"/"+req.query.city+"/",specialty:"/"+req.query.specialty+"/"}
                 .find({ city: { $regex: req.query.city }})
               
            // .populate(["parent", "provider"])
            // .select('-password')

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
 },delete_One:
 async (req, res, next) => {
     try {
   
          const removedEquip = await Equipement
               .findByIdAndRemove(req.params.ownerId)
          res.send(removedEquip)
     } catch (error) {
          next(error)
     }
},delete_one:
async function deleteProductById(req, res, next) {
   
     Equipement.findOneAndDelete(req.params.ownerId)
       .then(res.send("it worked"))
       .catch(err => next(err));
   },
   update_one:(req, res)=>{
     const {ownerId,name, price,description,reference,city,delivery,availability, transactionType} = req.body.formData;
    
        Equipement.findOneAndUpdate({'_id' : [
          req.body.formData[0]._id]},{ownerId,name, price,description,reference,city,delivery,availability, transactionType},{new:true})
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