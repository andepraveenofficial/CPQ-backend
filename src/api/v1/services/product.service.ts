/* eslint-disable class-methods-use-this */

import { v4 as uuidv4 } from 'uuid';
import ProductRepository from '../repositories/product.repository';
import { IProduct } from '../interfaces/product.interface';
import ApiError from '../utils/ApiError';

class ProductService {
  async createProduct(productDetails: IProduct): Promise<number[]> {
    try {
      const existingProduct = await ProductRepository.findByProductName(
        productDetails.name,
      );

      if (existingProduct) {
        const message = 'Product Already Exists';
        const statusCode = 400;
        throw new ApiError(statusCode, message);
      }

      const productWithUUID = {
        ...productDetails,
        id: uuidv4(),
        last_activity: new Date().toISOString().split('T')[0],
      };

      const newProductIds =
        await ProductRepository.createProduct(productWithUUID);
      return newProductIds;
    } catch (error) {
      console.error('Error because Product Already Existed');
      throw error;
    }
  }

  async getAllProducts(): Promise<IProduct[]> {
    try {
      const products = await ProductRepository.getAllProducts();
      return products;
    } catch (error) {
      console.error('Error in Get All Products');
      throw error;
    }
  }

  async changeProductStatus(id: string, status: string): Promise<IProduct> {
    try {
      const lastActivity = new Date().toISOString().split('T')[0];
      const updatedProduct = await ProductRepository.changeProductStatus(
        id,
        status,
        lastActivity,
      );

      if (!updatedProduct) {
        throw new ApiError(400, 'Product not found');
      }

      return updatedProduct;
    } catch (error) {
      console.error('Error at Change Product Status', error);
      throw error;
    }
  }
}

export default new ProductService();
