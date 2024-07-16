import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import ProductModel from '../models/product.model';
import { IProduct } from '../interfaces/product.interface';

// Create a Product
const createProduct = async (req: Request, res: Response) => {
  try {
    const productDetails: IProduct = req.body;

    // Check if product with the same name already exists
    const existingProduct = await ProductModel.findByProductName(
      productDetails.name,
    );

    if (existingProduct) {
      return res.status(400).json({ message: 'Product already exists' });
    }

    // Create new product
    const newProductIds = await ProductModel.createProduct({
      ...productDetails,
      uuid: uuidv4(),
    });

    return res.status(201).json({
      message: 'Product created successfully',
      productId: newProductIds[0],
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'An error occurred while creating the product' });
  }
};

// Retrieve all Products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.getAllProducts();

    return res.status(200).json(products);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'An error occurred while retrieving products' });
  }
};

// Change Product Status
const changeProductStatus = async (req: Request, res: Response) => {
  try {
    const { productUUID } = req.params;
    const { status } = req.body;

    // Update product status in the database
    const updatedProduct = await ProductModel.changeProductStatus(
      productUUID,
      status,
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log(updatedProduct);
    return res
      .status(200)
      .json({ message: 'Product status updated successfully' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'An error occurred while changing product status' });
  }
};

export { createProduct, getAllProducts, changeProductStatus };
