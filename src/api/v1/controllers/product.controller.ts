/* eslint-disable class-methods-use-this */

import { Request, Response } from 'express';
import ProductService from '../services/product.service';
import { IProduct } from '../interfaces/product.interface';
import authenticateToken from '../middlewares/auth.middleware';
import ApiResponseHandler from '../utils/ApiResponseHandler';

class ProductController {
  async createProduct(req: Request, res: Response): Promise<void> {
    // Apply authenticateToken middleware here
    await authenticateToken(req, res, async () => {
      try {
        const productDetails: IProduct = await req.body;
        const data = await ProductService.createProduct(productDetails);
        const message = 'Product created successfully';
        ApiResponseHandler.handleResponse(res, data, message);
      } catch (error) {
        ApiResponseHandler.handleError(res, error);
      }
    });
  }

  async getAllProducts(req: Request, res: Response): Promise<void> {
    // Apply authenticateToken middleware here
    await authenticateToken(req, res, async () => {
      try {
        const data = await ProductService.getAllProducts();
        const message = 'All Products Successfully Fetched';
        ApiResponseHandler.handleResponse(res, data, message);
      } catch (error) {
        ApiResponseHandler.handleError(res, error);
      }
    });
  }

  async changeProductStatus(req: Request, res: Response): Promise<void> {
    // Apply authenticateToken middleware here
    await authenticateToken(req, res, async () => {
      try {
        const { id } = req.params;
        const { status } = req.body;
        const data = await ProductService.changeProductStatus(id, status);
        const message = 'Product status updated successfully';
        ApiResponseHandler.handleResponse(res, data, message);
      } catch (error) {
        ApiResponseHandler.handleError(res, error);
      }
    });
  }
}

export default new ProductController();
