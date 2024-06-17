import { Router } from "express";
import * as controller from "../controllers/cart.controllers.js";
const router = Router();

router.get("/", controller.getAll);

router.get("/:cid", controller.getById);

router.post("/", controller.create);

router.put("/:cid/products/:pid", controller.addProduct);

router.put("/:cid/products", controller.updateProductQuantities);

router.delete("/:cid/products/:pid", controller.delProduct);

router.delete("/:cid", controller.remove);

router.delete("/cleanCart/:cid", controller.cleanCart);

export default router;