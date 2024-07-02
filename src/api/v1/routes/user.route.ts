import express from 'express';

/* -----> Controllers <----- */
import createUser from '../controllers/user.controller';

const router = express.Router();

// Registration -> Create a new user
router.post('/', createUser);

export default router;
