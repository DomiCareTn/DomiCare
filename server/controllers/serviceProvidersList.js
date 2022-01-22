const ServiceProvider  = require("../models/ServiceProvider.js")
const sp = require ('../models/Posts.js')



module.exports = {
	find_all_serviceProviders: async (req, res) => {
		try {
			const serviceP = await ServiceProvider.find({ type: "serviceProvider" }).populate('posts')	
			res.send(serviceP);
		} catch (err) {
			res.send(err);
		}
	},




	













	create_service_provider: async (req, res) => {

		
		
		try {
			const { userName, speciality, city, gender, picture, content } = req.body
			const service_provider = await ServiceProvider.create({
				userName, speciality, city, gender, picture, content
			
				
			})
			res.status(200).send(service_provider);
		}
		catch (error) {
			console.log(error)
		}
		
		
	},
	find_all_sp: async (req, res) => {
		try {
			const serviceP = await sp.find()
			res.send(serviceP);
		} catch (err) {
			res.send(err);
		}
	},








}
