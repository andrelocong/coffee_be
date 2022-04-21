import express from "express";
import { login, logout, logouts } from "../controllers/AuthController.js";
import {
	findAllGallery,
	findGalleryByLimit,
} from "../controllers/GalleryController.js";
import { createOrder } from "../controllers/OrderController.js";
import { findAllProductCategory } from "../controllers/ProductCategoryController.js";
import { findAll } from "../controllers/ProductController.js";
import { findAllProductMainCategory } from "../controllers/ProductMainCategoryController.js";
import { findAllProductSubCategory } from "../controllers/ProductSubCategoryController.js";
import { findAllQuantity } from "../controllers/QuantityController.js";
import { findOneSosmed } from "../controllers/SosmedController.js";
import { findALlTeam } from "../controllers/TeamController.js";

const router = express.Router();

router.get("/product", findAll);

router.get("/product-main-category/:id", findAllProductMainCategory);

router.get("/product-category/:id", findAllProductCategory);

router.get("/product-sub-category/:id", findAllProductSubCategory);

router.get("/quantity", findAllQuantity);

router.post("/order", createOrder);

router.get("/gallery", findAllGallery);
router.get("/gallery/data", findGalleryByLimit);

router.get("/team", findALlTeam);

router.get("/sosmed", findOneSosmed);

router.post("/login", login);
router.delete("/logout", logout);
router.delete("/logouts", logouts);

export default router;
