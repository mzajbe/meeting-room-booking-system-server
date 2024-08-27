import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';

const router = Router();

// This array maps paths to specific route handlers
const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
];

// Use each route in the application
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
