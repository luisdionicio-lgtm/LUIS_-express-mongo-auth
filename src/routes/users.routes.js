import express from 'express';
import { userController } from '../controllers/userController.js';

const router = express.Router();
// Express 4 necesita enviar los rechazos async al middleware de errores.
const handle = (controller) => (req, res, next) => {
  Promise.resolve(controller(req, res)).catch(next);
};

router.get('/', handle(userController.getAll));
router.get('/:id', handle(userController.getById));
router.post('/', handle(userController.create));
router.put('/:id', handle(userController.update));
router.delete('/:id', handle(userController.remove));

export default router;
