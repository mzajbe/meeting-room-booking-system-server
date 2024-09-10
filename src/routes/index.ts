import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { RoomRoutes } from '../modules/room/room.route';

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
  }
];

// Use each route in the application
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
