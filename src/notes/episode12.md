Logical Database Query and Compound indexes
--------------------------------------------

## creating a sending request API


requestRouter.post("/request/send/interested/:userId" , userAuth , (req,res)=>{
    const user = req.user // userAuth middlewarea added the user in the req object

    // sendind a connection request
    res.send(user.firstname + "send the connection request")
})


"/request/send/interested/:userId  here :userId  will be  toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required : true
    },
     status: {
        type:String,
        required : true,
        // what enum do?
        enum:{
            values:["ignored" , "interested" , "accepeted" , "rejected"],
            message: `${VALUE} is incorrect status type`
        }
     }  bc a connection request is send to userId and we will get fromUserId fromt the user that logged in already
        i need data of fromUserID and need data toUserId  userAuth middlewarew ill give the user that is looged in successfully const user = req.body and this loggedinuser is the person wjo is sending a request 
        so this is bascially the fromUserId = req.body and if we need to find the fromUserId we will find it from the 
        const fromUserId = req.user._id ;
