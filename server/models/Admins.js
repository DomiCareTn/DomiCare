const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const adminSchema = mongoose.Schema({
   
        email: {type:String,
        required: true
    },
    
        password: {type: String,
            required: true,
        minLength:8
    },
    date:{
        type:Date,
        default:Date.now
    },
 
    
})
adminSchema.pre('save', function(next){
    var admin = this;
    bcrypt.genSalt(10,function(err, salt){
        if(err) return next(err)
        bcrypt.hash(admin.password, salt,function(err, hash){
            if(err) return next(err)
            admin.password = hash;
            next()
        })
    })
}
)
const Admin= mongoose.model('Admin', adminSchema)
module.exports =Admin