/* eslint-disable class-methods-use-this */

import { Request, Response } from 'express';
import ProductService from '../services/product.service';
import { IProduct } from '../interfaces/product.interface';

class ProductController {
  private productService = ProductService;

  async createProduct(req: Request, res: Response): Promise<Response> {
    try {
      const productDetails: IProduct = req.body;
      const productId = await this.productService.createProduct(productDetails);
      return res.status(201).json({
        message: 'Product created successfully',
        productId,
      });
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === 'Product already exists'
      ) {
        return res.status(400).json({ message: error.message });
      }
      return res
        .status(500)
        .json({ message: 'An error occurred while creating the product' });
    }
  }

  async getAllProducts(req: Request, res: Response): Promise<Response> {
    try {
      const products = await ProductService.getAllProducts();
      return res.status(200).json(products);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'An error occurred while retrieving products' });
    }
  }

  async changeProductStatus(req: Request, res: Response): Promise<Response> {
    try {
      const { productUUID } = req.params;
      const { status } = req.body;
      await ProductService.changeProductStatus(productUUID, status);
      return res
        .status(200)
        .json({ message: 'Product status updated successfully' });
    } catch (error) {
      if (error instanceof Error && error.message === 'Product not found') {
        return res.status(404).json({ message: error.message });
      }
      return res
        .status(500)
        .json({ message: 'An error occurred while changing product status' });
    }
  }
}

export default new ProductController();
