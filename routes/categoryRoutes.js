import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from "../controllers/categoryController.js";

const router = express.Router()
// Route

// Create Category
router.post('/create-category', requireSignIn, isAdmin, createCategoryController)


// update Category
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController)

// getAll Category
router.get('/get-category', categoryController )

// single Category
router.get('/single-category/:slug', singleCategoryController )

// delete  Category
router.delete('/delete-category/:id' ,requireSignIn, isAdmin ,deleteCategoryController)





export default router
