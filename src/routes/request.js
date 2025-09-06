const express = require("express");
const { userAuth } = require("../middlewares/auth"); // Middleware to authenticate users
const connectionRequestModel = require("../models/connectionRequest"); // Mongoose model for connection requests
const requestRouter = express.Router();
const User = require("../models/user")


/**
 * 📨 Route: POST /request/send/:status/:toUserId
 * Purpose: Send a connection request from logged-in user (Kermit) to another user (Jack)
 * Middleware: userAuth → ensures only authenticated users can send requests
 */
requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        // 🧑 Get sender's user ID from JWT token (set by userAuth middleware)
        const fromUserId = req.user._id;

        // 👤 Get recipient's user ID from URL parameters
        const toUserId = req.params.toUserId;

        // 📌 Get request status from URL parameters (interested / ignored)
        const status = req.params.status;

        // ✅ Allow only specific status values
        const allowedStatus = ["interested", "ignored"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status type: " + status });
        }


        // check if toUserId(person whom we are sending a connection request) is even exist in the DB
        const toUser = await User.findById(toUserId)
        // if toUserId(receiver) don't exist
        if (!toUser) {
            return res.status(404).json({ message: "usernot found " })
        }
        /**
         * 🔍 Check if a connection request already exists between Kermit and Jack
         * 
         * 👉 We use $or(logical operator in mongodb) to check **two cases**:
         * 1️⃣ Kermit ➝ Jack  (fromUserId: Kermit, toUserId: Jack)
         * 2️⃣ Jack ➝ Kermit  (fromUserId: Jack, toUserId: Kermit)
         * 
         * ❌ If **either** case exists, do NOT allow another request.
         * Prevents:
         * - Kermit sending duplicate requests to Jack
         * - Jack trying to send one back while Kermit's request is still pending
         * ! If a connection request exists (in either direction), it returns that **document object**
         */
        const existingConnectionRequest = await connectionRequestModel.findOne({
            $or: [
                { fromUserId: fromUserId, toUserId: toUserId },   // Case 1  Kermit  -->  Jack (already exist)
                { fromUserId: toUserId, toUserId: fromUserId }    // Case 2  jack -->  kermit 
            ]
        });

        // ⚠️ Step 2: If a request already exists → block creating a new one
        if (existingConnectionRequest) {
            /**
             * 🔴 This block runs ONLY if `existingConnectionRequest` is NOT null
             * i.e., there is already a connection request between these two users.
             *
             * ❌ So we stop here and send a 400 Bad Request response.
             */
            return res.status(400).json({
                message: `Connection request already exists between these user`
            });
        }

        /**
         * 🛠️ Create new connection request document
         * This object will be stored in the database
         */
        const connectionRequest = new connectionRequestModel({
            fromUserId: fromUserId,
            toUserId: toUserId,
            status: status,
        });

        // The 'data' variable will hold the final saved document, including its new '_id' and timestamps
        const data = await connectionRequest.save();
      
      

        // --- Create a dynamic success message based on the status ---
        
        const senderName = req.user.firstName;
        const receiverName = toUser.firstName;
        let successMessage = ''; // Initialize an empty message variable

        if (status === 'interested') {
            successMessage = `Connection request sent successfully from ${senderName} to ${receiverName}.`;
        } else if (status === 'ignored') {
            // This message will be used if the status is 'ignored'
            successMessage = `${senderName} has ignored ${receiverName}.`;
        }


        // 📤 Send success response back to frontend
        res.json({
            message:  successMessage ,
            data: data
        });


    } catch (err) {
        // ❌ Handle any unexpected server/database errors
        res.status(400).send("Error: " + err.message);
    }
});

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try {
        // get the loggedIn user
        const loggedInUser = req.user;
        const { status, requestId } = req.params
        // validate this accepted rejected like only this two are allowed 
        const allowedStatus = ["accepted", "rejected"]
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                message: "Invalid Status or Status not allowed",
                success: false
            })
        }

        // validating the requestId (a document _id ) 
        const connectionRequest = await connectionRequestModel.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested"
        })

        if (!connectionRequest) {
            res.status(404).json({
                message: "request not found",
                success: false
            })
        }

        // update the status
        connectionRequest.status = status
        // save the document 
        const data = await connectionRequest.save();

        res.status(200).json({
            message: "connection request" + status,
            data: data,
            success: true
        })
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }



})

// 🚪 Export the router so it can be used in app.js
module.exports = requestRouter;
