/********************* Requires *********************/

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const QuestAns = require("./routers/Question&Answer")
const Equipements = require("./routers/Equipements.js")
const ServiceSeeker = require("./routers/ServiceSeeker.js");
const serviceProvidersList = require("./routers/serviceProvidersList.js")
const auth = require("./routers/auth-routes");
const ServiceProvider =  require("./routers/ServiceProvider")
const admin =  require("./routers/Admin.js")
const ServiceProviderProfile = require("./routers/users.js")
const SeekerRequest = require ("./routers/SeekerRequest.js")
const Users = require("./routers/users.js")
const ServiceSeekerRequests = require ("./routers/ServiceSeekerRequests.js")
// const servicesrequests=require("./routers/servicesrequestsfeed.js")


// **************************************
const Posts=require("./routers/Posts.js")
const Transactions=require("./routers/Transactions.js")
// **************************************

// const ServiceSeekerRequests = require ("./routers/ServiceSeekerRequests.js")

const Reports = require ("./routers/reports.js")


require("dotenv").config();
var cors = require("cors");
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/********************* Database *********************/

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Connected Database Successfully");
});



/********************** Routes **********************/
app.use("/Equipements", Equipements);
app.use("/serviceProvidersList",serviceProvidersList)
app.use("/ServiceSeeker", ServiceSeeker);
app.use("/savepost",QuestAns)
app.use("/admin",admin)
app.use("/auth", auth);
app.use("/ServiceProvider", ServiceProvider);
app.use("/editprofile",ServiceProviderProfile);
app.use("/SeekerRequest",SeekerRequest);
app.use("/Users",Users);
app.use("/ServiceSeekerRequests",ServiceSeekerRequests);

app.use("/reports",Reports);

// **************************************
app.use("/Posts",Posts)
app.use('/Transactions',Transactions)
// **************************************

/**************** Listening Requests ****************/
const Port = process.env.PORT||3000;
app.listen(Port, function (req, res) {
    console.log(`Server is started on port ${Port}`);
});
