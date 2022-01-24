var mongoose = require("mongoose");
var ServiceProviderSchema=mongoose.Schema(
  {
      
       type: {
        type: String,
    },
    userName: {
      type: String,
    },
        firstName: {
          type: String,
        },
        lastName: {
          type: String,
        },
        email: {
          type: String,
        },
        password: {
          type: String,
        },
        adress:{
          type:String, 
         },
        city: {
          type: String,
        },
        phoneNumber: {
          type: Number,
        },
        picture: {
          type: String,
        },
        speciality:{
          type: String,
        },
    posts: 
      [{ type: mongoose.Schema.Types.ObjectId, ref: 'Posts' }],
        
        availability: {
          type: Date,
    },
    banned : {
      type : Boolean ,
      default : false
    },
    verified : {
      type : Boolean ,
      default : false
    },
        certificate: {
          type: String,
        },
        gender: {
          type: String,
        },
        dateOfBirth: {
          type: String,
        },
        ratingAvg: {
          type: Number,
        },
        createdAt: {
          type: Date,
          immutable: true,
          default: () => Date.now(),
    },
      },
    
)
const ServiceProvider = mongoose.model("ServiceProvider", ServiceProviderSchema);
module.exports = ServiceProvider