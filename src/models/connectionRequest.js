// this connectionRequest model will define connection between the two users
const mongoose = require("mongoose")

const connectionRequestSchema = new mongoose.Schema({
    // sender
    fromUserId:{
     
        type:mongoose.Schema.Types.ObjectId,
        required : true,
        ref:"User"  // now this fromUserId field points to document in another collection
    },
    // receiver
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required : true,
        ref:'User'
    },
     status: {
        type:String,
        required : true,
                // 'enum' ensures the 'status' can ONLY be one of the values in the list below.
        enum:{
            values:["ignored" , "interested" , "accepted" , "rejected"],
            message: `{VALUE} is incorrect status type`
        }
     }


}, {timestamps:true})

connectionRequestSchema.pre("save" , function(next){
    const connectionRequest = this
    // check if the fromuserId is same as toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
            throw new Error("cannot send connection request to yourself ")
    }
    next()
})

// const connectionRequestModel =  mongoose.model(connectionRequestModel , connectionRequestSchema )
// module.exports = connectionRequest
//              OR
module.exports = mongoose.model("connectionRequestModel" , connectionRequestSchema)