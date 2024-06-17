import CartDaoMongoDB from "../dao/mongodb/cart.dao.js";
const cartDao = new CartDaoMongoDB();

export const getAll = async () => {
    try {
        return await cartDao.getAll();
    } catch (error) {
        throw new Error(error);
    }
};
export const getById = async (id) => {
    try {
        return await cartDao.getById(id);
    } catch (error) {
        throw new Error(error);
    }
};

export const create = async (cart) => {
    try {
        return await cartDao.create(cart);
    } catch (error) {
        throw new Error(error);
    }
};
export const addProduct = async (id, productId, quantity) => {
    try {
        if (!quantity || quantity < 1) quantity = 1;
        return await cartDao.addProduct(id, productId, quantity);
    } catch (error) {
        throw new Error(error);
    }
};

export const updateProductQuantities = async (cid, products) => {
    try {
        return await cartDao.updateProductQuantities(cid, products);
    } catch (error) {
        throw new Error(error);
    }
}

export const delProduct = async (cid, pid) => {
    try {
        return await cartDao.delProduct(cid, pid)
    } catch (error) {
        throw new Error(error);
    }
}
export const remove = async (cid) => {
    try {
        return await cartDao.delete(cid);
    } catch (error) {
        throw new Error(error);
    }
};

export const cleanCart = async (cid) => {
    try {
        const CartExists = await getById(cid);
        if (!CartExists) return null;
        return await cartDao.cleanCart(cid);
    } catch (error) {
        throw new Error(error);
    }
}