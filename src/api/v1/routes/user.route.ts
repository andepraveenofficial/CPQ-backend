import express from 'express';

/* -----> Controllers <----- */
import UserController from '../controllers/user.controller';

const router = express.Router();

// Registration -> Create a new user
router.post('/', UserController.createUser);

// Login -> Login a user
router.post('/login', UserController.loginUser);

export default router;
