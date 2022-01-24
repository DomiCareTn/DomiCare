
const Notifications = require("../models/Notifications")

module.exports = {

    FindAll:(req,res)=>{
      let receiver_id
      = req.params.userId
        Notifications.find({receiver_id
        }).sort({ createdAt: -1 })
        .exec()
                .then((result)=>{
                  res.send(result)})
                .catch((err)=>console.log(err))
      },
      Seen:(req,res)=>{
        Notifications.updateOne({_id: req.params.notificationId}, {seen : true})
                     .then((result)=> {
                       console.log(result)
                      res.send('Seen')
                     })
                     .catch((err)=> console.log(err))
      },

}