const Equipement = require("../models/Equipements.js")
const ServiceProvider = require("../models/ServiceProvider.js");

module.exports = {
     create_One : (req,res) => {
          let obj =req.body.formData
          console.log("req.body",obj);
          console.log(req.body.formData)
          Equipement.create(obj)
          .then((equip)=> res.send(equip))
          .then(()=>console.log(equip))
          .catch((err)=>console.log(err))
     },

  find_All: async (req, res, next) => {
       try {
            console.log("query", req.query);               // the server will try the following
            console.log("params", req.params);
            const Equipements = await Equipement
                 .find({})
               console.log("Equipements",Equipements);
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
console.log('req.params :', req.params.userID)
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
          // console.log("\nRequesting the server to delete a specific user from the database ...\n");
          // console.log("req.params.userId222",req.params.ownerId);
          // console.log("{_id:req.params.userId}",{ownerId:req.params.ownerId});
          // the server will try the following
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
     const {ownerId,name, price,description,reference,city,delivery,availability,transactionType,quantity} = req.body.formData;
             console.log("id",{_id:req.params.equipementsId});
             console.log("data",req.body.formData[0])
        Equipement.findOneAndUpdate({'_id' : [
          req.body.formData[0]._id]},{ownerId,name, price,description,reference,city,delivery,availability, transactionType,quantity},{new:true})
          .then(user=>res.send(user))
          .catch(err => (console.log(err)));
      }, 
      findEquip:  (req, res) => {
           console.log("data2find",req.params);
           console.log("data3find",{_id:req.params.equipementsID});
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