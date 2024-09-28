import express from "express";
import { UserControllers } from "./user.controller";
import { authorizeAdmin } from "../../middlewares/authorizeAdmin";

const router = express.Router();

// Route to handle user sign-up
router.post("/signup", UserControllers.signUp);
router.get('/admins',UserControllers.getAdmin );
router.get('/user/:id',UserControllers.getSingleUser);


router.get("/getUserByEmail/:email",UserControllers.getUserByEmail);
router.put("/promoteToAdmin/:id",UserControllers.promoteToAdmin);



// router.post("/create-admin", UserControllers.createAdmin);

export const UserRoutes = router;

///api/auth
