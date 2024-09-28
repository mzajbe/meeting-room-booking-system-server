import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { RoomRoutes } from '../modules/room/room.route';
import { SlotRoutes } from '../modules/slot/slot.route';
import { BookingsRoutes } from '../modules/bookings/bookings.routes';

const router = Router();

// This array maps paths to specific route handlers
const moduleRoutes = [
  {
    path: '/api/auth',
    route: UserRoutes,
  },
  
  {
    path: '/api/auth',
    route: AuthRoutes,
  },
  {
    path:'/api',
    route:RoomRoutes,
  },
  {
    path:'/api/slots',
    route: SlotRoutes,
  },
  {
    path:'/api/bookings',
    route: BookingsRoutes,
  }
];

// Use each route in the application
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
