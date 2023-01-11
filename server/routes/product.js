import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.js";

router.get("/", getProducts);
router.get("/:id", getProduct);

router.post("/", auth, createProduct);
router.delete("/:id", auth, deleteProduct);
router.patch("/:id", auth, updateProduct);

export default router;
