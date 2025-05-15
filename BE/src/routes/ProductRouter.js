const router = express.Router()
import express from 'express';
import productController from '../controllers/ProductController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const { authMiddleWare, authUserMiddleWare } = authMiddleware;

router.post('/create', productController.createProduct)
router.get('/detail/:id', productController.getDetailsProduct)
router.get('/get-all', productController.getAllProduct)
router.get('/search', productController.search)

export default router;