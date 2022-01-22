const adminLogin = require("../models/Admins.js");
const bcrypt = require("bcrypt");
const Posts = require("../models/Posts.js")
const report = require('../models/reports.js')
const Equipement = require("../models/Equipements.js")
const QuestAns = require("../models/Question&Answers");



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
        console.log(postId)


        try {
            const data = await Equipement.findByIdAndRemove({_id:equipId})   
        }
        catch (error) { console.log('err', error) }
          
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
        
    




    
}