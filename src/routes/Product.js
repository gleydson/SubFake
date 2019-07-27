import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/multer';

const routes = new Router();
const ProductController = require('../controllers/ProductController');
const upload = multer(uploadConfig);

routes.post('/api/product', upload.single('image'), ProductController.insert);
routes.get('/api/product/:id', ProductController.getOne);
routes.delete('/api/product/:id', ProductController.removeOne);
routes.get('/api/product', ProductController.getAll);

export default routes;
