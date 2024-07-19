/* eslint-disable class-methods-use-this */

import { Request, Response } from 'express';
import ProductService from '../services/product.service';
import { IProduct } from '../interfaces/product.interface';
import authenticateToken from '../middlewares/auth.middleware'; // Import your authentication middleware

class ProductController {
  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      // Apply authenticateToken middleware here
      await authenticateToken(req, res, async () => {
        const productDetails: IProduct = req.body;
        const productId = await ProductService.createProduct(productDetails);
        return res.status(201).json({
          message: 'Product created successfully',
          productId,
        });
      });
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === 'Product already exists'
      ) {
        res.status(400).json({ message: error.message });
      }
      res
        .status(500)
        .json({ message: 'An error occurred while creating the product' });
    }
  }

  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      // Apply authenticateToken middleware here
      await authenticateToken(req, res, async () => {
        const products = await ProductService.getAllProducts();
        res.status(200).json(products);
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'An error occurred while retrieving products' });
    }
  }

  async changeProductStatus(req: Request, res: Response): Promise<void> {
    try {
      // Apply authenticateToken middleware here
      await authenticateToken(req, res, async () => {
        const { productUUID } = req.params;
        const { status } = req.body;
        await ProductService.changeProductStatus(productUUID, status);
        return res
          .status(200)
          .json({ message: 'Product status updated successfully' });
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'Product not found') {
        res.status(404).json({ message: error.message });
      }
      res
        .status(500)
        .json({ message: 'An error occurred while changing product status' });
    }
  }
}

export default new ProductController();
