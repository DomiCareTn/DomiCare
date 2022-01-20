const ServiceSeeker = require("../models/ServiceSeeker.js");
const ServiceProvider = require("../models/ServiceProvider.js");
const ResetPassword = require("../models/ResetPassword.js");
const bcrypt = require("bcrypt");
const { nodemailer } = require("../helpers/nodemailer");
const serverEmail = process.env.serverEmail;

module.exports = {
    GoogleLogin:(req,res)=>{
        const data = req.body
        ServiceProvider.findOne({email:data.email})
        .then((user)=>{
            if(user){
                res.send(user)
            }
            else{
                ServiceSeeker.findOne({email:data.email})
                .then((user)=>{
                    if(user){
                        res.send(user)
                    } else {
                       res.send('you need to SignUp')
                    }
                })
                .catch((err)=>console.log(err))
            }
        })
        .catch((err)=>console.log(err))
    },
    
    SPGoogleSignUp:(req,res)=>{
        const data = req.body.obj
        ServiceSeeker.findOne({email:data.email})
        .then((user)=>{
            if(user){
                res.send('email already exists')
            }
            else {
                ServiceProvider.findOne({email:data.email})
                .then((user)=>{
                    if(user){
                        res.send('email already exists')
                    } else {
                       
                          var obj = {
                              email :  data.email,
                              firstName : data.firstName,
                              lastName : data.lastName,
                              userName : data.userName,
                              picture : data.picture,
                              city: '',
                              phoneNumber:data.phoneNumber,
                              gender:'',
                              dateOfBirth:'',
                              verified: true,
                              certificate: data.certificate,
                              city: data.city,
                              type: 'serviceProvider'
                          }
                          ServiceProvider.create(obj)
                                .then((user)=>{
                                res.send(user)})
                                .catch((err)=> console.log(err))
                    }
                })
            }
        })
        .catch((err)=> console.log(err))
    },
    SSGoogleSignUp:(req,res)=>{
        const data = req.body.obj
        ServiceProvider.findOne({email:data.email})
        .then((user)=>{
            if(user){
                res.send('email already exists')
            }
            else {
                ServiceSeeker.findOne({email:data.email})
                .then((user)=>{
                    if(user){
                        res.send('email already exists')
                    } else {
                       
                          var obj = {
                              email :  data.email,
                              firstName : data.firstName,
                              lastName : data.lastName,
                              userName : data.userName,
                              picture : data.picture,
                              city: '',
                              phoneNumber:data.phoneNumber,
                              gender:'',
                              dateOfBirth:'',
                              
                              verified: true
                          }
                          ServiceSeeker.create(obj)
                                .then((user)=>{
                                res.send(user)})
                                .catch((err)=> console.log(err))
                    }
                })
            }
        })
        .catch((err)=> console.log(err))
    },
    EPGoogleSignUp:(req,res)=>{
        const data = req.body.obj
        ServiceSeeker.findOne({email:data.email})
        .then((user)=>{
            if(user){
                res.send('email already exists')
            }
            else {
                ServiceProvider.findOne({email:data.email})
                .then((user)=>{
                    if(user){
                        res.send('email already exists')
                    } else {
                       
                          var obj = {
                              email :  data.email,
                              firstName : data.firstName,
                              lastName : data.lastName,
                              userName : data.userName,
                              picture : data.picture,
                              city: '',
                              phoneNumber:data.phoneNumber,
                              gender:'',
                              dateOfBirth:'',
                              verified: true,
                              type: 'equipementsProvider',
                          }
                          ServiceProvider.create(obj)
                                .then((user)=>{
                                res.send(user)})
                                .catch((err)=> console.log(err))
                    }
                })
            }
        })
        .catch((err)=> console.log(err))
    },
    SSSignUp: (req, res) => {
        var data = req.body.formData;

        ServiceSeeker.findOne({ userName: data.userName })
            .then((user) => {
                if (user) {
                    res.send("Username already exists");
                } else {
                    ServiceSeeker.findOne({ email: data.email.toLowerCase() })
                        .then((user) => {
                            if (user) {
                                res.send("email address already exists");
                            } else {
                                ServiceProvider.findOne({
                                    email: data.email.toLowerCase(),
                                }).then((user) => {
                                    if (user) {
                                        res.send(
                                            "email address already exists"
                                        );
                                    } else {
                                        const passwordHash = bcrypt.hashSync(
                                            data.password,
                                            10
                                        );
                                        var obj = {
                                            firstName: data.firstName,
                                            lastName: data.lastName,
                                            userName: data.userName,
                                            email: data.email.toLowerCase(),
                                            password: passwordHash,
                                            adress: "",
                                            city: "",
                                            phoneNumber: data.phoneNumber,
                                            gender: "",
                                            dateOfBirth: "",
                                            picture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
                                        };
                                        ServiceSeeker.create(obj)
                                            .then((user) => res.send(user))
                                            .catch((err) => console.log(err));
                                    }
                                });
                            }
                        })
                        .catch((err) => console.log(err));
                }
            })
            .catch((err) => console.log(err));
    },

    EPSignUp: (req, res) => {
        var data = req.body.formData;
        ServiceProvider.findOne({ email: data.email.toLowerCase() })
            .then((user) => {
                if (user) {
                    res.send("email address already exists");
                } else {
                    ServiceProvider.findOne({ email: data.email.toLowerCase() }).then(
                        (user) => {
                            if (user) {
                                res.send("email address already exists");
                            } else {
                                const passwordHash = bcrypt.hashSync(
                                    data.password,
                                    10
                                );
                                var obj = {
                                    type: "equipementsProvider",
                                    firstName: data.firstName,
                                    lastName: data.lastName,
                                    email: data.email.toLowerCase(),
                                    password: passwordHash,
                                    adress: "",
                                    city: "",
                                    phoneNumber: data.phoneNumber,
                                    gender: "",
                                    dateOfBirth: "",
                                    picture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
                                };
                                ServiceProvider.create(obj)
                                    .then((user) => res.send(user))
                                    .catch((err) => console.log(err));
                            }
                        }
                    );
                }
            })
            .catch((err) => console.log(err));
    },
    
    SPSignUp: (req, res) => {
        var data = req.body.formData;
        ServiceProvider.findOne({ email: data.email.toLowerCase() })
            .then((user) => {
                if (user) {
                    res.send("email address already exists");
                } else {
                    ServiceProvider.findOne({ email: data.email.toLowerCase() }).then(
                        (user) => {
                            if (user) {
                                res.send("email address already exists");
                            } else {
                                const passwordHash = bcrypt.hashSync(
                                    data.password,
                                    10
                                );
                                var obj = {
                                    type: "serviceProvider",
                                    firstName: data.firstName,
                                    lastName: data.lastName,
                                    email: data.email.toLowerCase(),
                                    password: passwordHash,
                                    adress: "",
                                    city: data.city,
                                    phoneNumber: data.phoneNumber,
                                    gender: "",
                                    dateOfBirth: "",
                                    picture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
                                    certificate : data.certificate
                                };
                                ServiceProvider.create(obj)
                                    .then((user) => res.send(user))
                                    .catch((err) => console.log(err));
                            }
                        }
                    );
                }
            })
            .catch((err) => console.log(err));
    },
    
    Login: (req, res) => {
        const data = req.body.formData
        ServiceSeeker.findOne({ email: data.email.toLowerCase() })
        .then((user)=> {
            if(user){
                bcrypt.compare(data.password, user.password)
                .then((success)=>{
                    if(success){
                        res.send(user)
                    }
                    else res.send("Your email and password do not match")
                })
            }
            else{
                ServiceProvider.findOne({ email: data.email.toLowerCase() })
                .then((user)=>{
                    if (user){
                       bcrypt.compare(data.password, user.password)
                       .then((success)=>{
                        if(success){
                            res.send(user)
                        }
                        else res.send("Your email and password do not match")
                       })
                    }
                    else {
                        res.send("Your email and password do not match")
                    }
                })
            }
        }
        )
        .catch((err)=> console.log(err))
    },
    ForgetPassword: (req, res) => {
        const email =req.body.formData.email
        ServiceSeeker.findOne({ email: email.toLowerCase() })
        .then((user)=> {
            if(user){
                let hash_code = require("crypto").randomBytes(4).toString("hex");
                let obj = {
                    code : hash_code,
                    email : email,
                }
                ResetPassword.findOneAndDelete({email})
                             .then(() =>{
                                console.log('code deleted') 
                             } )
                             .catch((err) => console.log(err));
                             
                ResetPassword.create(obj)
                             .then(()=>{
                                 console.log("code created")
                             } )
               let subject = "Reset password instructions";
               let html = `<p>Hello ${user.firstName} ${user.lastName}</p>
               <p>Someone has requested a code to change your password, Use this code to complete the setup of the following reset password: <h1> ${hash_code} </h1></p>
               <p>This code will expire in 1 hour.</p>
               <p>If you didn't request this, please ignore this email.</p>`;
               const newMail = {email, subject, html };
               nodemailer(newMail);
               res.send("code sended")
            }
            else{
                ServiceProvider.findOne({ email: email.toLowerCase() })
                .then((user)=>{
                    if (user){
                        let hash_code = require("crypto").randomBytes(4).toString("hex");
                        let obj = {
                            code : hash_code,
                            email : email
                        }
                        ResetPassword.findOneAndDelete({email})
                        .then(() =>{
                           console.log('code deleted') 
                        } )
                        .catch((err) => console.log(err));
                        
           ResetPassword.create(obj)
                        .then(()=>{
                            console.log("code created")
                        } )
                        
                       let subject = "Reset password instructions";
                       let html = `<p>Hello ${user.firstName} ${user.lastName}</p>
                       <p>Someone has requested a code to change your password, Use this code to complete the setup of the following reset password: <h1> ${hash_code} </h1>  </p>
                       <p>This code will expire in 1 hour.</p>
                       <p>If you didn't request this, please ignore this email.</p>`;
                       const newMail = {email, subject, html };
                       nodemailer(newMail);
                       res.send('code sended')
                    }
                    else {
                        res.send("Email address dosen't exists ")
                    }
                })
            }
        }
        )
        .catch((err)=> console.log(err))
    },
    ResetPassword : (req,res)=>{
        const email = req.body.email
        const passwordHash = bcrypt.hashSync(
            req.body.pass,
            10
        ); 
        ServiceProvider.findOneAndUpdate({ email: email.toLowerCase()}, {password : passwordHash},{
            new: true
          })
        .then((user)=> {
            if(user){
                res.send(user)
            }
            else{
                ServiceSeeker.findOneAndUpdate({email: email.toLowerCase()}, {password : passwordHash},{new: true})
                .then((user)=>{
                    if (user){
                       res.send(user)
                    }
                    else {
                        res.send("failed to reset password")
                    }
                })
            }
        }
        )
        .catch((err)=> console.log(err))
    },
    FetchCodeVerification:(req,res)=>{
        let email = req.params.email;
        ResetPassword.findOne({email})
                        .then((user) =>{
                           res.send(user) 
                        } )
                        .catch((err) => console.log(err));
    },
    DeleteCodeVerification :(req,res)=>{
        let email = req.params.email;
        ResetPassword.findOneAndDelete({email})
                        .then(() =>{
                           console.log('code deleted') 
                        } )
                        .catch((err) => console.log(err));
    }
};
