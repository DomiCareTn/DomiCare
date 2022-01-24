const posts = require('../models/Posts')
const ServiceProvider = require("../models/ServiceProvider")

module.exports = {
    share_service: async (req, res) => {
		try {
			const tools = await posts.create(req.body.reqS)
			console.log(tools._id)
			const author=await ServiceProvider.findOneAndUpdate({_id: req.body._id},{$push : {posts: tools._id}},{ new: true}).exec()
			res.send("succ");
		} catch (err) {
			res.send(err);
		}
	},
}
