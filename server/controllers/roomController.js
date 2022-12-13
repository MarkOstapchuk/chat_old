import {roomModel} from "../schemas/RoomModel.js";

export const createRoomController = async (req, res) => {
    console.log(req.body)
    try {
        const match = await roomModel.find({name:req.body.name})
        if (match.length !== 0) {
            return res.status(500).send('name was already taken')
        }
        const result = await roomModel.create({...req.body})
        res.status(200).json(result)
    } catch (err) {
        res.send(err)
    }

};
export const getAllRoomsController = async (req, res) => {
    try {
        const result = await roomModel.find()
        res.status(200).json(result)
    } catch (err) {
        res.send(err)
    }

};
export const getRoomsController = async (req, res) => {
    try {
        const result = await roomModel.find()
        const filtered = result.filter((item)=>item.password==='')
        res.status(200).json(filtered)
    } catch (err) {
        res.send(err)
    }

};
export const getOneRoomController = async (req, res) => {
    try {
        const result = await roomModel.findById(req.params.id)
        res.status(200).json(result)
    } catch (err) {
        res.send(err)
    }

};
export const connectRoomController = async (req, res) => {
    try {
        const result = await roomModel.findOne({name: req.body.name})
        if (!result) {
            return res.status(500).json('room not found')
        }
        if (result.password !== req.body.password) {
           return res.status(500).json('passwords do not match')
        }
        const res2 = await roomModel.findByIdAndUpdate(result._id, {$push: {participants:req.body.userName}},{new: true})
        return res.status(200).json({mess:'connected', res2: {
                userName:req.body.userName,
                _id: res2._id
            }})
        //return res.status(200).json({mess:'connected', result})

    } catch (err) {
        res.send(err)
    }

};
export const disconnectRoomController = async (req, res) => {
    try {

        const result = await roomModel.findByIdAndUpdate(req.body._id, {$pull: {participants:req.body.userName}},{new: true})
        return res.status(200).json( result)
    } catch (err) {
        res.send(err)
    }

};