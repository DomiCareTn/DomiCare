

var mongoose = require("mongoose");
var ReportsSchema = new mongoose.Schema({


            reporter: {
                type: mongoose.Schema.Types.String, ref: 'ServiceSeeker',
               
            },
            reported: {
                type: mongoose.Schema.Types.String,
                ref: "ServiceProvider",
              
            },
        
    title: {
        type: String,
      
    
            },
            reason: {
                type: String,
               
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