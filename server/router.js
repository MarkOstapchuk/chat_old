import express from "express";
import {
    getOneRoomController,
    getRoomsController,
    createRoomController,
    connectRoomController, getAllRoomsController, disconnectRoomController
} from "./controllers/roomController.js";

const router = express.Router();

router.post('/', createRoomController)
router.post('/connect', connectRoomController)
router.post('/disconnect', disconnectRoomController)
router.get('/', getRoomsController)
router.get('/all', getAllRoomsController)
router.get('/:id', getOneRoomController)

export default router
