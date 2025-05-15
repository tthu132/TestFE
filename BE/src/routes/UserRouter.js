const router = express.Router()
import express from 'express';
import userController from '../controllers/UserController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const { authMiddleWare, authUserMiddleWare } = authMiddleware;

router.post('/login', userController.loginUser)
router.post('/create', userController.createUser)
router.get('/detail/:id', authUserMiddleWare, userController.detailUser)
router.put('/update/:id', authUserMiddleWare,userController.updateUser)
router.post('/refresh-token', userController.refreshToken)
router.post('/logout', userController.logoutUser)

export default router;