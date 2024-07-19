import express from 'express';

/* -----> Controllers <----- */
import ProductController from '../controllers/product.controller';

const router = express.Router();

// Create a Product
router.post('/', ProductController.createProduct);

// Retrieve all Products
router.get('/', ProductController.getAllProducts);

// Update product status
router.put('/:productUUID', ProductController.changeProductStatus);

export default router;
