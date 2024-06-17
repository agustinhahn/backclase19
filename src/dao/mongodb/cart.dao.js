import mongoose from "mongoose";
import { CartModel } from "./models/cart.model.js";

//extraigo ObjectId directamente de mongoose
const { Types: { ObjectId } } = mongoose;

export default class CartDaoMongoDB {
  getAll = async () => {
    try {
      return await CartModel.find();
    } catch (error) {
      throw new Error(error);
    }
  };

  getById = async (cid) => {
    try {
      const response = await CartModel.findById(cid).populate('products.product');
      if (!response) {
        throw new Error(`Cart with id ${cid} not found`);
      } else {
        return response;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  create = async (cart) => {
    try {
      return await CartModel.create(cart);
    } catch (error) {
      throw new Error(error);
    }
  };

  addProduct = async (cartId, productId, quantity) => {
    try {

      console.log(cartId)
      console.log(productId)
      const cartIdObj = new ObjectId(cartId);
      const productIdObj = new ObjectId(productId);
      const cart = await CartModel.findById(cartIdObj);
      console.log(cart)
      if (!cart) {
        throw new Error(`Cart with id ${cartId} not found`);
      }
      const existingProductIndex = cart.products.findIndex(p => p.product.equals(productIdObj));
      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity += quantity;
      } else {
        cart.products.push({ product: productIdObj, quantity });
      }
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  };
  
  updateProductQuantities = async (cartId, products) => {
    try {
      const cartIdObj = new ObjectId(cartId);
      // Buscar el carrito por su ID
      const cart = await CartModel.findById(cartIdObj);
      if (!cart) throw new Error(`Cart with id ${cartId} not found`);
  
      // Recorrer los productos enviados en la solicitud
      for (const { productId, quantity } of products) {
        const productIdObj = new ObjectId(productId);
  
        // Buscar si el producto ya existe en el carrito
        const existingProductIndex = cart.products.findIndex(p => p.product.equals(productIdObj));
        if (existingProductIndex !== -1) {
          // Si el producto ya existe, actualizar la cantidad
          cart.products[existingProductIndex].quantity = quantity;
        } else {
          // Si el producto no existe, agregarlo al carrito
          cart.products.push({ product: productIdObj, quantity });
        }
      }
  
      // Guardar los cambios en el carrito
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  };
  

  delProduct = async (cartId, productId) => {
    try {
      //convertir productId y cartId a ObjectId para la comparacion
      const cartIdObj = new ObjectId(cartId);
      const productIdObj = new ObjectId(productId);

      const cart = await CartModel.findById(cartIdObj);
      if (!cart) throw new Error(`Cart with id ${cartId} not found`);

      cart.products = cart.products.filter(p => !p.product.equals(productIdObj) );

      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  };

  delete = async (cid) => {
    try {
      const cart = await CartModel.findByIdAndDelete(cid);
      if (!cart) {
        throw new Error(`Cart with id ${cid} not found`);
      }
      return cart;
    } catch (error) {
      throw new Error(`Error deleting cart: ${error.message}`);
    }
  };

  cleanCart = async (cid) => {
    try {
      const clearCart = await CartModel.findByIdAndUpdate(
        cid,
        { $set: { products: [] } },
        { new: true }
      );
      return clearCart;
    } catch (error) {
      throw new Error(error)
    }
  }
}