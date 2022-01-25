const admin = require("../models/Admins.js");
const bcrypt = require("bcrypt");
const Posts = require("../models/Posts.js")
const report = require('../models/reports.js')
const Equipement = require("../models/Equipements.js")
const QuestAns = require("../models/Question&Answers");
const ServiceProvider  = require("../models/ServiceProvider.js")
const ServiceSeeker = require("../models/ServiceSeeker.js")
const Transactions = require("../models/Transactions");
const Admins = require("../models/Admins");




module.exports = {

    login: async (req, res) => {
        try {
            console.log(req.body);
        let { email , password } = req.body
            let user = await admin.findOne({ email })
            console.log(user);
            if (!user) {
            
            return res.json({ msg: "this user doesn't exist" })

            }
            else{res.json({ msg: "login succeded" })}
        let isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.send({ msg: "Wrong password" })
            }
    }catch(err){console.log(err);}

        
    },

    








    get_all_posts: async(req,res) => {
        try {
           const posts = await Posts.find({}).populate("serviceSeeker_id")
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
            const reports = await report.find({}).populate('onModel.enum')
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
    get_all_transactions: async(req,res) => {
        try {
           const trans = await Transactions.find({})
            res.send(trans)
        
    }
    catch (err) {
        res.send(err)
    }
        
    },
    get_all_admins: async(req,res) => {
        try {
           const admin = await Admins.find({})
            res.send(admin)
        
    }
    catch (err) {
        res.send(err)
    }
        
    },
    verify_User: async (req, res) => {
        
        const id = req.params.id
        console.log(id);
        
        try {
            const verify = await ServiceProvider.findByIdAndUpdate(id,{verified:true})
            res.send({verify})
         }
        catch(err){console.log(err);
        }
    },

        
    




    
}