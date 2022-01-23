
const Notifications = require("../models/Notifications")

module.exports = {

    FindAll:(req,res)=>{
        Notifications.find()
                .then((result)=>{
                  console.log('Notifications', result)
                  res.send(result)})
                .catch((err)=>console.log(err))
      },    
     

}