import express from 'express';

/* -----> Controllers <----- */
import { createUser, loginUser } from '../controllers/user.controller';

const router = express.Router();

// Registration -> Create a new user
router.post('/', createUser);

// Login -> Login a user
router.post('/login', loginUser);
export default router;
