import express from 'express'
import {createServer} from 'node:http'
import { Server } from 'socket.io'
import dotenv from 'dotenv'
import { connectDb } from './config/Mongodb.config.js'
import cookieParser from 'cookie-parser'
import AuthRouter from './routes/Auth.route.js'
import msgModel from './model/Msg.model.js'
const app = express()
const server = createServer(app)
dotenv.config()
connectDb()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use('/api/v1/auth',AuthRouter)

const io = new Server(server,{
    cors:{
        origin:'*',
        credentials:true
    }
})


io.on('connection',(socket)=>{
    console.log('user connected',socket.id)

        

})



app.get('/',(req,res)=>{
    res.send('hellwo')
})
server.listen(4000,()=>{
    console.log('ther server is running...')
})

