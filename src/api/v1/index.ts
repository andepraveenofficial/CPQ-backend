import express, { Request, Response } from 'express';

/* -----> Import Routes <----- */
import userRoutes from './routes/user.route';
import productRoutes from './routes/product.route';
import customerRoutes from './routes/customer.route';
import proposalRoutes from './routes/proposal.route';

const router = express.Router();

// Test route for v1
router.get('/', (req: Request, res: Response) => {
  res.send('Welcome to API v1');
});

// User routes
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/customers', customerRoutes);
router.use('/proposals', proposalRoutes);

export default router;
