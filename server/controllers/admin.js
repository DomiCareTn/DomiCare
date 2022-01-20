const adminLogin = require("../models/Admins.js");
const bcrypt = require("bcrypt");
const Posts = require("../models/Posts.js")
const report = require('../models/reports.js')
const Equipement = require("../models/Equipements.js")
const QuestAns = require("../models/Question&Answers");
const ServiceProvider  = require("../models/ServiceProvider.js")
const ServiceSeeker  = require("../models/ServiceSeeker.js")



module.exports = {

    login: function (req, res) {
        adminLogin.create({ email: req.body.email,password:req.body.password }, (err, user) => {
            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                if (err) res.json({ message: 'password incorrect' })
                res.status(200).send(isMatch)
            })
        })
    },
    get_all_posts: async(req,res) => {
        try {
           const posts = await Posts.find({})
            res.send(posts)
        
    }
    catch (err) {
        res.send(err)
    }
        
    },
    delete_post: async (req, res) => {
        const postId = req.params.id
        console.log(postId)


        try {
            const data = await Posts.findByIdAndRemove({_id:postId})   
        }
        catch (error) { console.log('err', error) }
          
    },
    get_reports: async (req, res) => {
        try {
            const reports = await report.find({})
             res.send(reports)
         
     }
     catch (err) {
         res.send(err);
     }
         
    },
    get_equipement: async (req, res) => {
        try {
            const equip = await Equipement.find({})
            res.send(equip)
         
        }
        catch (err) {
            res.send(err);
        }
    },
    delete_equipement: async (req, res) => {
        const equipId = req.params.id
        console.log(equipId)


        try {
            const data = await Equipement.findByIdAndRemove({_id:equipId})   
        }
        catch (error) { console.log('err', error) }
          
    },
    get_all_service_Providers: async(req,res) => {
        try {
           const SP = await ServiceProvider.find({})
            res.send(SP)
        
    }
    catch (err) {
        res.send(err)
    }
        
    },
    get_all_service_Seekers: async(req,res) => {
        try {
           const SS = await ServiceSeeker.find({})
            res.send(SS)
        
    }
    catch (err) {
        res.send(err)
    }
        
    },





    get_quesans: async (req, res) => {
        try {
            const quesan = await QuestAns.find({})
            res.send(quesan)
             
        }
        catch (err) {
            res.send(err);
        }
    },
    delete_quesans: async (req, res) => {
        const quesans = req.params.id
        console.log(quesans)

            
        try {
            const data = await QuestAns.findByIdAndRemove({_id:quesans})   
        }
        catch (error) { console.log('err', error) }
          
    },
    bann_User: async (req, res) => {
        
        const id = req.params.id
        console.log(id);
        
        try {
            const bann = await ServiceProvider.findByIdAndUpdate(id,{banned:true})
            res.send({bann})
         }
        catch(err){console.log(err);
        }
    },
    bann_UserSS: async (req, res) => {
        
        const id = req.params.id
        console.log(id);
        
        try {
            const bann = await ServiceSeeker.findByIdAndUpdate(id,{banned:true})
            res.send({bann})
         }
        catch(err){console.log(err);
        }
    },
    unbann_User: async (req, res) => {
        
        const id = req.params.id
        console.log(id);
        
        try {
            const unbann = await ServiceProvider.findByIdAndUpdate(id,{banned:false})
            res.send({unbann})
         }
        catch(err){console.log(err);
        }
    },
    unbann_UserSS: async (req, res) => {
        
        const id = req.params.id
        console.log(id);
        
        try {
            const unbann = await ServiceSeeker.findByIdAndUpdate(id,{banned:false})
            res.send({unbann})
         }
        catch(err){console.log(err);
        }
    },
    // find_One: async (req, res, next) => {
    //     console.log(req.params.id)
    //     try {
          
    //       const servs = await ServiceProvider.findById({ _id: req.params.id });
    //       console.log(servs)
    //       res.status(200).json(servs);
    //     } catch (error) {
    //       next(error);
    //     }
    //   },

        
    




    
}