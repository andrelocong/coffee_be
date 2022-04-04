import express from "express";
import { upload } from "../config/multer.js";

import {
	create,
	findAll,
	getDataById,
	updateData,
	deleteData,
	getDataByName,
} from "../controllers/ProductController.js";

import {
	uploadImage,
	findAllGallery,
	deleteDataGallery,
	findGalleryByLimit,
} from "../controllers/GalleryController.js";

import {
	createSosmed,
	findAllSosmed,
	updateDataSosmed,
	deleteDataSosmed,
} from "../controllers/SosmedController.js";

import {
	createTeam,
	deleteDataTeam,
	findALlTeam,
	findDataByIdTeam,
	updateDataTeam,
	updateImageTeam,
} from "../controllers/TeamController.js";

import {
	createUser,
	deleteDataUser,
	findOneByIdUser,
	findAllUser,
	updateDataUser,
	updateImageUser,
} from "../controllers/UserController.js";

import {
	createMainCategory,
	deleteMainCategory,
	findAllMainCategory,
	findOneMainCategory,
	updateMainCategory,
} from "../controllers/MainCategoryController.js";

import {
	createCategory,
	deleteDataCategory,
	updateDataCategory,
	findAllCategory,
} from "../controllers/CategoryController.js";

import {
	createSubCategory,
	deleteDataSubCategory,
	findAllSubCategory,
	updateDataSubCategory,
} from "../controllers/SubCategoryController.js";

import {
	createQuantity,
	deleteDataQuantity,
	findAllQuantity,
	updateDataQuantity,
} from "../controllers/QuantityController.js";

import {
	createProductMainCategory,
	deleteDataProductMainCategory,
	findAllProductMainCategory,
} from "../controllers/ProductMainCategoryController.js";

import {
	createProductCategory,
	deleteDataProductCategory,
	findAllProductCategory,
} from "../controllers/ProductCategoryController.js";

import {
	createProductSubCategory,
	deleteDataProductSubCategory,
	findAllProductSubCategory,
} from "../controllers/ProductSubCategoryController.js";

import {
	createOrder,
	deleteDataOrder,
	findAllOrder,
	findOrderById,
	updateOrderStatus,
} from "../controllers/OrderController.js";
import {
	createRole,
	deleteDataRole,
	findAllRole,
	findOneRole,
} from "../controllers/RoleController.js";
import {
	createRoleAccess,
	deleteDataRoleAccess,
	findAllRoleAccess,
	updateDataRoleAccess,
} from "../controllers/RoleAccessController.js";
import { logins } from "../controllers/AuthController.js";

const router = express.Router();

router.get("/product/find", getDataByName);
router.post("/product", create);
router.get("/product", findAll);
router.get("/product/:id", getDataById);
router.patch("/product/:id", updateData);
router.delete("/product/:id", deleteData);

router.post("/upload/image", upload.single("image"), uploadImage);
router.get("/gallery", findAllGallery);
router.get("/gallery/data", findGalleryByLimit);
router.delete("/gallery/:id", deleteDataGallery);

router.get("/sosmed", findAllSosmed);
router.post("/sosmed", createSosmed);
router.patch("/sosmed/:id", updateDataSosmed);
router.delete("/sosmed/:id", deleteDataSosmed);

router.post("/team", upload.single("image"), createTeam);
router.get("/team", findALlTeam);
router.patch("/team/:id", updateDataTeam);
router.delete("/team/:id", deleteDataTeam);
router.get("/team/:id", findDataByIdTeam);
router.patch("/team/image/:id", upload.single("image"), updateImageTeam);

router.post("/user", createUser);
router.get("/user", findAllUser);
router.patch("/user/:id", updateDataUser);
router.patch("/user/image/:id", upload.single("image"), updateImageUser);
router.delete("/user/:id", deleteDataUser);
router.get("/user/:id", findOneByIdUser);

router.post("/main-category", createMainCategory);
router.get("/main-category", findAllMainCategory);
router.patch("/main-category/:id", updateMainCategory);
router.delete("/main-category/:id", deleteMainCategory);
router.get("/main-category/data/:id", findOneMainCategory);

router.post("/category", createCategory);
router.get("/category", findAllCategory);
router.patch("/category/:id", updateDataCategory);
router.delete("/category/:id", deleteDataCategory);

router.post("/sub-category", createSubCategory);
router.get("/sub-category", findAllSubCategory);
router.patch("/sub-category/:id", updateDataSubCategory);
router.delete("/sub-category/:id", deleteDataSubCategory);

router.post("/quantity", createQuantity);
router.get("/quantity", findAllQuantity);
router.patch("/quantity/:id", updateDataQuantity);
router.delete("/quantity/:id", deleteDataQuantity);

router.post("/product-main-category", createProductMainCategory);
router.get("/product-main-category/:id", findAllProductMainCategory);
router.delete("/product-main-category/:id", deleteDataProductMainCategory);

router.post("/product-category", createProductCategory);
router.get("/product-category/:id", findAllProductCategory);
router.delete("/product-category/:id", deleteDataProductCategory);

router.post("/product-sub-category", createProductSubCategory);
router.get("/product-sub-category/:id", findAllProductSubCategory);
router.delete("/product-sub-category/:id", deleteDataProductSubCategory);

router.post("/order", createOrder);
router.get("/order", findAllOrder);
router.get("/order/:id", findOrderById);
router.patch("/order/status/:id", updateOrderStatus);
router.delete("/oreder/:id", deleteDataOrder);

router.post("/role", createRole);
router.get("/role", findAllRole);
router.delete("/role/:id", deleteDataRole);
router.get("/role/:id", findOneRole);

router.post("/role-access", createRoleAccess);
router.get("/role-access/:id", findAllRoleAccess);
router.patch("/role-access/:id", updateDataRoleAccess);
router.delete("/role-access/:id", deleteDataRoleAccess);

router.post("/logins", logins);

export default router;
