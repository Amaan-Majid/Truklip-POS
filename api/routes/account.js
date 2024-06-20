const express = require("express");
const Account = require("../models/Account");
const router = express.Router();

router.post("/addPayment", async (req, res) => {
  try {
    const result = await Account.findOne({
      customerName: req.body.customerName,
    });
    if (result) {
      const updatedAmount = await Account.findOneAndUpdate(
        { customerName: req.body.customerName },
        { $inc: { amount: req.body.amount } },
        { new: true }
      );
      res.status(200).json("Amount Updated!");
    } else {
      const payment = await Account.create(req.body);
      res.status(200).json("Payment Created!");
    }
  } catch (error) {
    res.status(400).json(error);
  }
});
router.get("/viewPayment", async (req, res) => {
  try {
    const payments = await Account.find({});
    res.status(200).json(payments);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/deletePayments", async (req, res) => {
  try {
    await Account.deleteMany({});
    res.status(200).json("All payments deleted.");
  } catch (error) {
    res.send(400).json(error);
  }
});
module.exports = router;
