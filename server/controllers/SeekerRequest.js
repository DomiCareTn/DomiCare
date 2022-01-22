// const Posts = require("../models/Posts.js")
const Transactions = require("../models/Transactions.js")
const ServiceSeeker = require ("../models/ServiceSeeker")
const ServiceProvider = require ("../models/ServiceProvider")

module.exports = {
    send_request: async (req, res) => {
        const {
            seekerId,
            providerId,
            adress,
            details,
            selectedStartDate,
            selectedEndDate,
            file

        }=req.body
        try {
          
            const demand = await Transactions.create({
                seekerId,
                providerId,
                adress,
                details,
                selectedStartDate,
                selectedEndDate,
                file
            })
            res.send("request sended");
		} catch (err) {
			res.send(err);
		}
    }
 
    }
    
  
