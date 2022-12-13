import mongoose from 'mongoose'
const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false,
    },
    online: {
        type: Number,
        required: true,
    },
    participants: Array,
    messages: Array,
})
export const roomModel  = mongoose.model('roomModel',roomSchema)