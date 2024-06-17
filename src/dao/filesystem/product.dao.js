import fs from 'fs';
const path = './src/models/products.json';

class Product {
    constructor(title, description, category, price, thumbnail, code, stock, status) {
        this.id = Product.addId();
        this.title = title;
        this.category = category;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.status = status;
    }

    static addId() {
        if (!this.idIncremental) {
            this.idIncremental = 1;
        } else {
            this.idIncremental++;
        }
        return this.idIncremental;
    }

    static setInitialId(products){
        if (products.length > 0) {
            this.idIncremental = Math.max(...products.map(p => p.id)) + 1;
        } else {
            this.idIncremental = 1;
        }
    }
}

export default class ProductDaoFS {
    constructor(path) {
        this.path = path;
        this.initialize();
    }

    initialize = async () => {
        const products = await this.getAll();
        Product.setInitialId(products);
    }

    create = async (obj) => {
        try {
            let products = await this.getAll();
            if (products.some(p => p.code === obj.code)) {
                throw new Error(`El código de producto ${obj.code} ya existe`);
            }
            if (Object.values(obj).some(value => value === "" || value === null || value === undefined)) {
                throw new Error("Los campos no pueden estar vacíos");
            }
            const product = new Product(obj.title, obj.description, obj.category, obj.price, obj.thumbnail, obj.code, obj.stock, true);
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return product;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    getAll = async () => {
        try {
            if (fs.existsSync(this.path)) {
                let products = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(products);
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    getById = async (productId) => {
        try {
            const products = await this.getAll();
            return products.find(product => product.id === pasrseInt(productId)) || null;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    update = async (productId, newProductData) => {
        try {
            const products = await this.getAll();
            const index = products.findIndex(p => p.id === productId);
            if (index === -1) {
                throw new Error(`No existe producto con id: ${productId}`);
            }
            products[index] = { ...products[index], ...newProductData };
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            console.log(`Se actualizó producto con id ${productId}`);
            return products[index];
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    delete = async (productId) => {
        try {
            const products = await this.getAll();
            const newProducts = products.filter(p => p.id !== parseInt(productId));

            if(newProducts.length === products.length) {
                throw new Error(`No existe producto con id: ${productId}`);
            }
            await fs.promises.writeFile(this.path, JSON.stringify(newProducts, null, 2));
            console.log(`Producto con id ${productId} eliminado`);
            return newProducts;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}