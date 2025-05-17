import express from 'express';
import { registerUser, loginUser, deleteUser } from '../controllers/authController.js';
import { validateRegister, validateLogin } from '../middleware/validateInput.js';

const router = express.Router();

router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);
router.delete('/delete', deleteUser);

export default router;  