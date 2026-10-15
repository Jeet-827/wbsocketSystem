import userModel from "../model/user.model.js";

export const serachUser = async(req,res)=>{
    try {
        const q = req.query.search
    const users = await userModel.find({
    $or: [
        { email: { $regex: q, $options: 'i' } },
        { username: { $regex: q, $options: 'i' } }
    ]
});

        if(users.length === 0){
            return res.status(401).json({message:"usernot found"})
        }

        res.status(201).json({message:"search user return",users})
    } catch (error) {
        res.status(501).json({message:error.message})
    }
}