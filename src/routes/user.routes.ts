import express from 'express';
import UserController from '../controllers/User_C';
import { verifyJwt } from '../helpers/third-party/authentication';

const router = express.Router();

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);

router.put('/change-plan/:id', verifyJwt, UserController.updateUser);

export default router;
