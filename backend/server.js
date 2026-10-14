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
    
    socket.on('roomId',(data)=>{
        socket.join(data)
    })


    socket.on('oldemessage',async(roomId)=>{
        try {
            const oldMessage = await msgModel.find({roomId})
            io.to(roomId).emit('getOldMessage',oldMessage)
        } catch (error) {
              socket.emit('messageError', {
                message: 'Failed to send message'
            });
        }

    })

    socket.on('sendMessage',async(data)=>{
       try {
         const newMessage = await msgModel.create(
         {
               roomId:data.roomId,
            senderId:data.senderId,
            reciverId:data.reciverId,
            message:data.message
         })
         io.to(roomId).emit('recivemessage',newMessage)
       } catch (error) {
          socket.emit('messageError', {
                message: 'Failed to send message'
            });
       }
    })
        

})

app.get('/',(req,res)=>{
    res.send('hellwo')
})
server.listen(4000,()=>{
    console.log('ther server is running...')
})

