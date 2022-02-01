const mongoose = require("mongoose");
const Equipement = mongoose.model(
  "Equipement",
  new mongoose.Schema({
    name: {
      type: String
    },
    reference: {
      type: String
    },
    description: {
      type: String
    },

    transactionType: {
      type: String
    },
    price: {
      type: Number
    },
    quantity: {
      type: Number
    },
    picture: {
      type: String
    },
    paiementLinks: {
      type: Object,
      default : {}
    },

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceProvider"
    },
    city: { type: String }
  })
);
module.exports = Equipement;
