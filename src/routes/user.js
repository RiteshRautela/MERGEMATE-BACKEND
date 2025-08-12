const express = require("express")
const userRouter = express.Router()
const { userAuth } = require("../middlewares/auth");
const connectionRequestModel = require("../models/connectionRequest")
const User = require('../models/user')

//! GET /user/requests/received (Get all pending  connection requests for the loggedInuser)

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequest = await connectionRequestModel.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", ["firstName", "lastName"])

        res.json({
            message: "Data fetched successfully ",
            data: connectionRequest
        })

    } catch (err) {
        res.status(400).send("Error :" + err.message)
    }

})

userRouter.get("/user/connections", userAuth, async (req, res) => {

    try {
        const loggedInUser = req.user;

        // find all the connection
        const connectionRequest = await connectionRequestModel.find({
            // Use $or to find requests where you are either person in the connection
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" }
            ],
        }).populate("fromUserId", ["firstName", "lastName"]).populate("toUserId", ["firstName", "lastName"]) // Also populate toUserId

        const data = connectionRequest.map((row) => {
            /// This part runs if the logged-in user (Will) is the SENDER.
            // Example: For the connection "Will Turner --> Jack Sparrow".
            // Since Will is the sender, we return the receiver: Jack 
            if (row.fromUserId._id.equals(loggedInUser._id)) {
                return row.toUserId;
            } else {
                // This part runs if the logged-in user (Will) is the RECEIVER.
                // Example: For the connection "Elizabeth --> Will Turner".
                // Since Will is the receiver, we return the sender: Elizabeth.
                return row.fromUserId;
            }
        })



        res.json({
            message: `Data fetched successfully ! Connection List of ${loggedInUser.firstName} ${loggedInUser.lastName}`,
            data: data
        })


    } catch (err) {
        res.status(400).send("Error :" + err.message)
    }
})

// * `GET /user/feed` (Get a batch of profiles for swiping)
userRouter.get("/user/feed", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user
        const page = parseInt(req.query.page) || 1
        let limit = parseInt(req.query.limit)|| 10
        limit = limit>50?50:limit;


        const skip = (page-1)*limit


        // get all the connection req (interested, ignored, accepted, rejected)
        const connectionRequest = await connectionRequestModel.find({
            $or: [
                { fromUserId: loggedInUser._id },   /// when the user is sender(interested , ignore)
                { toUserId: loggedInUser._id }     // when the user is receiver (accept or reject the req )
            ]
        }).select("fromUserId toUserId")
        // set() dont allow duplicate values in it
        const hideUserFromFeed = new Set()
        //* This code loops through each of our connectionRequest documents and adds the IDs of both the sender and the receiver to your hideUserFromFeed list.Its purpose is to build a complete, unique list of every user you have already interacted with
        connectionRequest.forEach((req) => {
            hideUserFromFeed.add(req.fromUserId.toString())
            hideUserFromFeed.add(req.toUserId.toString())
        })

        //! User collection call. // Find all users who are NOT in the hide list.
        const user = await User.find({
            $and: [
                // all the _id that are not present in hideUserFromFeed
                { _id: { $nin: Array.from(hideUserFromFeed) } },
                // id in User should not equal to the loggedinuser aka the user should no see his card in the feed :)
                { _id: { $ne: loggedInUser._id } }
            ]
        }).select("firstName lastName age gender anout skills").skip(skip).limit(limit)

        res.send(user)
    } catch (err) {
        res.status(400).send("Error :" + err.message)
    }

})


module.exports = userRouter