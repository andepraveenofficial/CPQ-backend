import express from 'express';

/* -----> Controllers <----- */
import CustomerController from '../controllers/customer.controller';

const router = express.Router();

// Create a Product
router.post('/', CustomerController.createCustomer);

// Retrieve all Products
router.get('/', CustomerController.getAllCustomers);

export default router;
