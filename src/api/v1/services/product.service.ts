/* eslint-disable class-methods-use-this */

import { v4 as uuidv4 } from 'uuid';
import ProductRepository from '../repositories/product.repository';
import { IProduct } from '../interfaces/product.interface';

class ProductService {
  async createProduct(productDetails: IProduct): Promise<number> {
    const existingProduct = await ProductRepository.findByProductName(
      productDetails.name,
    );

    if (existingProduct) {
      throw new Error('Product already exists');
    }

    const productWithUUID = {
      ...productDetails,
      uuid: uuidv4(),
    };

    const newProductIds =
      await ProductRepository.createProduct(productWithUUID);
    return newProductIds[0];
  }

  async getAllProducts(): Promise<IProduct[]> {
    const products = await ProductRepository.getAllProducts();
    return products;
  }

  async changeProductStatus(
    productUUID: string,
    status: string,
  ): Promise<IProduct> {
    const updatedProduct = await ProductRepository.changeProductStatus(
      productUUID,
      status,
    );

    if (!updatedProduct) {
      throw new Error('Product not found');
    }

    return updatedProduct;
  }
}

export default new ProductService();
