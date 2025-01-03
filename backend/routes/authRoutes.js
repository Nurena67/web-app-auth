import express from "express";
import {Login, logOut, Me} from "../controllers/auth.js";
<<<<<<< HEAD
import {verifyUser} from '../middleware/AuthUser.js'
=======
import { verifyUser } from "../middleware/AuthUser.js";
>>>>>>> 2fac3fd1f62df1b1f09f93fc012edae191582790

const router = express.Router();

router.get('/me', verifyUser, Me);
router.post('/login', Login);
router.delete('/logout', logOut);

export default router;
