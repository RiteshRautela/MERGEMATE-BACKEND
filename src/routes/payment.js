const express = require("express");
const { userAuth } = require("../middlewares/auth");
const paymentRouter = express.Router();
const instance = require("../util/razorpay")
const Payment = require("../models/payment");
const { membershipAmount } = require("../util/constant");
const { validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils')
const User = require("../models/user")
//userAuth --> only the authinticated valid user can hit this api 
paymentRouter.post("/payment/create", userAuth, async (req, res) => {
    try {

        const { membershipType } = req.body;
        const { firstName, lastName, emailId } = req.user;
        // code to create a order on razorpay
        const order = await instance.orders.create({
            "amount": membershipAmount[membershipType] * 100,
            "currency": "INR",
            receipt: "order_rcptid_11",
            "notes": {
                "firstName": firstName,
                "lastName": lastName,
                "emailId": emailId,
                "membershipType": membershipType,
            }

        })



        const payment = new Payment({
            userId: req.user._id,
            orderId: order.id,
            status: order.status,
            amount: order.amount,
            currency: order.currency,
            receipt: order.receipt,
            notes: order.notes

        })

        const savedPayment = await payment.save()
        // Return back order detials to frontend
        res.json({ ...savedPayment.toJSON(), keyId: process.env.RAZORPAY_KEY_ID })

    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

paymentRouter.post("/payment/webhook", async (req, res) => {
    try {
        const webhookSignature = req.get("X-Razorpay-Signature")
        const isWebHookValid = validateWebhookSignature(JSON.stringify(req.body), webhookSignature, process.env.RAZORPAY_webhook_Secret)

        if (!isWebHookValid) {
            return res.send(400).json({ msg: "webhook signature is invalid" })
        }
        // if webhook is valid then update payment status in db
        const paymentDetails = req.body.payload.payment.entity

        const payment = await Payment.findOne({
            orderId: paymentDetails.order_id,
        })
        payment.status = paymentDetials.status;
        await payment.save();
        // update the user as premium
        const user = await User.findOne({
            id: payment.userId
        })
        user.isPremium = true
        user.membershipType = payment.notes.membershipType
        await user.save()

        // return success response to Razorpay
        // if(req.body.event === "paymen.captured"){

        // } 

        // if(req.body.event === "paymen.failed"){

        // } 

        return res.status(200).json({ msg: "Webhook received successfully" })

    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

module.exports = paymentRouter
