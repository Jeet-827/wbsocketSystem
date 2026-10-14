import dotenv from 'dotenv'
import Imagekit from 'imagekit'
dotenv.config()
const imagekit = new Imagekit({
    privateKey:process.env.IMAGEKITPRUVATE,
    publicKey:process.env.IMAGEKITPUBLIC,
    urlEndpoint:process.env.IMAGEKITURLENDPOINT
})

export default imagekit