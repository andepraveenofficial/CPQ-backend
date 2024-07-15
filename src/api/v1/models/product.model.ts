import knex from '../../../knexdb'; // database operations
import { IProduct } from '../interfaces/product.interface';

const findByProductName = async (name: string) => {
  const dbUser = await knex('products').where({ name }).first();
  return dbUser;
};

const createProduct = async (productDetails: IProduct): Promise<number[]> => {
  // Insert new product into database
  const newUserIds = await knex('products').insert(productDetails);
  return newUserIds;
};

const getAllProducts = async (): Promise<IProduct[]> => {
  // Retrieve all products from database
  const products = await knex('products').select('*');

  return products;
};

const changeProductStatus = async (
  productId: number,
  status: string,
): Promise<IProduct | null> => {
  try {
    // Update product status in the database
    await knex('products').where({ id: productId }).update({status});

    // Fetch the updated product
    const updatedProduct = await knex('products')
      .where({ id: productId })
      .first();

    return updatedProduct || null; // Return the updated product object or null if not found
  } catch (error) {
    console.error('Error updating product status:', error);
    throw error; // Rethrow the error to be caught by the caller
  }
};

export default {
  findByProductName,
  createProduct,
  getAllProducts,
  changeProductStatus,
};
