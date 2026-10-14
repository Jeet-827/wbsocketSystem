import mongoose from "mongoose";

const MsgSchema = mongoose.Schema({
    roomId:{
        type:String,
        required:true,
    },
    senderId:{
        type:String,
        required:true
    },
    reciverId:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    createAt:{
        type:Date,
        default:Date.now()
    }
})

MsgSchema.index({ roomId: 1 }, { unique: true });

const msgModel = mongoose.model('msg',MsgSchema)

export default msgModel