import express from 'express';
import { createBook } from '../controllers/bookController';

const bookRoute = express.Router();

bookRoute.post('/', createBook);

export default bookRoute;
