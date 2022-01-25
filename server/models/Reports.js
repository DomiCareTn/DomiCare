

var mongoose = require("mongoose");
var ReportsSchema = new mongoose.Schema({


            reporterId: {
                type: mongoose.Schema.Types.ObjectId, refPath: 'onModel',
                required: true,
            },
            reportedId: {
                type: mongoose.Schema.Types.ObjectId, refPath: 'onModel',
                required: true,
            },
            onModel: {
                type: String,
                enum: ['ServiceSeeker', 'ServiceProvider']
            },
            reason: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                immutable: true,
                default: () => Date.now(),
            },
        
        
}
)
const Reports = mongoose.model("Reports", ReportsSchema);
module.exports =  Reports;