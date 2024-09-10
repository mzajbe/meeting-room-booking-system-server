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
   
router.post('/rooms',
auth(USER_ROLE.user),
RoomControllers.createRoom);
router.get('/rooms/:id',RoomControllers.getSingleRoom);
router.get('/rooms',RoomControllers.getAllRoom);
//update route
router.patch('/rooms/:id',RoomControllers.updateRoom);

  export const RoomRoutes = router;