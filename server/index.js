import express from 'express'
import router from "./router.js";
import mongoose from "mongoose";
import cors from 'cors'
import {Server} from 'socket.io'
import http from 'http'
import {setCors} from "./middlewares.js";
import {roomModel} from "./schemas/RoomModel.js";

const app = express()

app.use(cors())
app.use(express.json());
app.use('/api',router)

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["POST"]
    }
});

io.on('connection', socket => {

        socket.on('ROOM:JOIN', async ({_id, userName}) => {
            try {
                const result = await roomModel.findById(_id)
                socket.join(_id)
                console.log(_id)
                socket.to(_id).emit("ROOM:SET", result);
                socket.to(_id).emit('ROOM:MESSAGE_RECEIVE', '23')
            } catch (err) {
            }
        })
    socket.on('ROOM:DISCONNECTED', async ({userName, id})=>{
            socket.join(id)
            console.log('disconnected')
            const ff = await roomModel.findByIdAndUpdate(id, {$pull: {participants:userName}},{new: true})
            const result = await roomModel.findById(id)
            socket.to(id).emit("ROOM:SET", result);
    }
    )
    socket.on('ROOM:MESSAGE_SEND', async({from, text, id})=>{
        socket.join(id)
        const res2 = await roomModel.findByIdAndUpdate(id, {$push: {messages:{from, text}}},{new: true})
        const result = await roomModel.findById(id)
        io.to(id).emit("ROOM:SET", result);
    })
    }
)
const start = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://admin:root@cluster0.brc6y2x.mongodb.net/?retryWrites=true&w=majority'
        );
        server.listen(4000, () => console.log("Server started on port 4000"));
    } catch (error) {

    }
};
start()