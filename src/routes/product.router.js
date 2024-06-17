import { Router } from 'express';
import * as controller from "../controllers/product.controllers.js"
const router = Router();

router.get('/', controller.getAllProducts);

router.get('/cat', controller.getProductByCategory);

router.get('/:id', controller.getProductById);

router.post('/', controller.createProduct);

router.put('/:id', controller.updateProduct);

router.delete('/:id', controller.deleteProduct);

//router.delete('/', controller.deleteAllProducts); // Nueva ruta para eliminar todos los productos

export default router;