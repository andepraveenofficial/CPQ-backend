import express from 'express';

/* -----> Controllers <----- */
import {
  changeProductStatus,
  createProduct,
  getAllProducts,
} from '../controllers/product.controller';

const router = express.Router();

// Create a Product
router.post('/', createProduct);

// Retrieve all Products
router.get('/', getAllProducts);

// Update product status
router.put('/:productId', changeProductStatus);

export default router;
