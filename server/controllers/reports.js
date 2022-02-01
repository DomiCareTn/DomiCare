const report = require('../models/reports.js')


module.exports = {
	reports: async (req, res) => {
		// console.log("helloooo",req.body);
		const {title,reason,reporter,reported}=req.body
		try {
			const reportas = await report.create({title,reason,reporter,reported})
			res.send(reportas);
			console.log(reportas);
			
		} catch (err) {
			console.log("err",err);
			res.send(err);
		}
	},
}
