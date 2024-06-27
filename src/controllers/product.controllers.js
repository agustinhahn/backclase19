// import ProductManager from "../dao/mongodb/product.dao";
// const productManager = new ProductManager();
import * as service from "../services/product.services.js";

export const getAllProducts = async (req, res, next) => {
    try {
        const { page, limit, title, sort, category } = req.query;
        const hasTitle = title ? `&title=${title}` : "" ;
        const hasSort = sort ? `&sort=${sort}` : "" ;
        let products = await service.getAll(page, limit, title, sort, category);
        const nextLink = products.hasNextPage
            ? `http://localhost:8080/products?limit=${products.limit}&page=${products.nextPage}${hasTitle}${hasSort}`
            : null;
        const prevLink = products.hasPrevPage
            ? `http://localhost:8080/products?limit=${products.limit}&page=${products.prevPage}${hasTitle}${hasSort}`
            : null;
        const response = {
            payload: products.docs,
            info: {
                count: products.totalDocs,
                totalPages: products.totalPages,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevLink,
                nextLink,
            }
        };

        if(!products) res.status(404).json( { msg: "Product not found"});
        // else res.render('realtimeproducts',response)
        else res.status(200).json(response);
    } catch (error) {
        next(error.message);
    }
}

export const getProductById = async (req, res, next) => {
    try {
        const { id }  = req.params;
        const product = await service.getById(id);
        if(!product) res.status(404).json({msg: 'Product not found'});
        else res.json(product);
    } catch (error) {
        next(error);
    }
}

export const getProductByCategory = async (req, res, next) => {
    try {
        const { category, stock, page, limit, sort} = req.query;
        const hasCategory = category? `&category=${category}` : "" ;
        const hasStock = stock? `&stock=${stock}` : "" ;
        const hasSort = sort? `&sort=${sort}` : "" ;
        let products = await service.getByCategory(category, stock, page, limit, sort);
        const nextLink = products.hasNextPage
        ? `http://localhost:8080/products/cat?limit=${products.limit}&page=${products.nextPage}${hasCategory}${hasStock}${hasSort}`
        : null;
        const prevLink = products.hasPrevPage
        ? `http://localhost:8080/products/cat?limit=${products.limit}&page=${products.prevPage}${hasCategory}${hasStock}${hasSort}`
        : null;
        const response = {
            payload: products.docs,
            info: {
                totalPages: products.totalPages,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevLink,
                nextLink,
            }
        };
        if(!products) res.status(404).json( { msg: "Product not found"});
        else res.status(200).json(response);
    } catch (error) {
        next(error.message);
    }
}

export const createProduct = async (req, res, next) => {
    try {
        const newProduct = await service.create(req.body);
        if(!newProduct) res.status(404).json({msg: 'Error creating product'});
        else res.json(newProduct);
    } catch (error) {
        next(error.message);
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prodUpdate = await service.update(id, req.body);
        if(!prodUpdate) res.status(404).json({msg: 'Error update product'});
        else res.json(prodUpdate);
    } catch (error) {
        next(error.message);
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prodDelete = await service.remove(id)
        if(!prodDelete) res.status(404).json({msg: 'Error deleting product'});
        else res.json(prodDelete);
    } catch (error) {
        next(error.message);
    }
};

export const deleteAllProducts = async (req, res, next) => {
    try {
        const prodDeleteAll = await service.removeAll();
        res.json({ msg: 'Successfully deleted all products' });
    } catch (error) {
        next(error.message);
    }
}