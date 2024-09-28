import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { RoomValidation } from './room.validation';
import { RoomControllers } from './room.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';


const router = express.Router();

// router.post(
//     '/rooms',
//     validateRequest(
//         RoomValidation.createRoomValidationSchema,
//     ),
//     RoomControllers.createRoom,
//   );
   
router.post('/rooms',RoomControllers.createRoom);
// auth(USER_ROLE.user)
router.get('/rooms/:id',RoomControllers.getSingleRoom);
router.get('/rooms',RoomControllers.getAllRoom);
//update route
router.put('/rooms/:id',RoomControllers.updateRoom);
router.delete('/rooms/:id/soft-delete',RoomControllers.softDeleteRoom);


  export const RoomRoutes = router;