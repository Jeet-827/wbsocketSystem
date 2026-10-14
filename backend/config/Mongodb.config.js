import mongoose from "mongoose";

export const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGODBSTERING)
        console.log('the db is connected')
    } catch (error) {
        console.log(error)
    }
}