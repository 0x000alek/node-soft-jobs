import { Router } from 'express';

import authMiddleware from '../middleware/auth.middleware.js';

import {
  getUsuarioController,
  loginUsuarioController,
  registerUsuarioController,
} from '../src/controllers/usuarios.controller.js';

const router = Router();

router.get('/usuarios', authMiddleware.verifyToken(), getUsuarioController);

router.post('/login', loginUsuarioController);
router.post('/usuarios', registerUsuarioController);

export default router;
