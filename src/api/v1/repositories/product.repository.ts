/* eslint-disable class-methods-use-this */

import knex from '../../../knexdb';
import { IProduct } from '../interfaces/product.interface';

class ProductRepository {
  async findByProductName(name: string): Promise<IProduct | undefined> {
    const dbProduct = await knex('products').where({ name }).first();
    return dbProduct;
  }

  async createProduct(productDetails: IProduct): Promise<number[]> {
    // Insert new product into database
    const newProductIds = await knex('products').insert(productDetails);
    return newProductIds;
  }

  async getAllProducts(): Promise<IProduct[]> {
    // Retrieve all products from database
    const products = await knex('products').select('*');
    return products;
  }

  async changeProductStatus(
    productUUID: string,
    status: string,
  ): Promise<IProduct | null> {
    // Update product status in the database
    await knex('products').where({ uuid: productUUID }).update({ status });

    // Fetch the updated product
    const updatedProduct = await knex('products')
      .where({ uuid: productUUID })
      .first();

    return updatedProduct || null;
  }
}

export default new ProductRepository();
