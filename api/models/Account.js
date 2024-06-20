const mongoose = require("mongoose");
const AccountSchema = new mongoose.Schema({
  customerName: {
    type: String,
  },
  customerPhoneNumber: {
    type: Number,
  },
  amount: {
    type: Number,
  },
});
const Account = mongoose.model("accounts", AccountSchema);
module.exports = Account;
