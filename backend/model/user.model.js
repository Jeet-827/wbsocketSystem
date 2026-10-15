import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    profile:{
        type:String,
    default:"https://imgs.search.brave.com/ur_d-_rKlM9k0uo_KRyrtENneQYIPXnC6ldqzCuECFU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L3ByZW1pdW0tdmVj/dG9yL2RlZmF1bHQt/YXZhdGFyLXByb2Zp/bGUtaWNvbi1zb2Np/YWwtbWVkaWEtdXNl/ci1pbWFnZS1ncmF5/LWF2YXRhci1pY29u/LWJsYW5rLXByb2Zp/bGUtc2lsaG91ZXR0/ZS12ZWN0b3ItaWxs/dXN0cmF0aW9uXzU2/MTE1OC0zMzgzLmpw/Zz9zZW10PWFpc19o/eWJyaWQmdz03NDAm/cT04MA"
    },
     sentRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }],

    receivedRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }],

    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }],
    
})
userSchema.index({ email: 1 }, { unique: true });


const userModel = mongoose.model('user',userSchema)

export default userModel