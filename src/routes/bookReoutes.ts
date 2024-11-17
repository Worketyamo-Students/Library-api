import express from 'express';
import { createBook } from '../controllers/bookController';
import {getBooks} from '../controllers/GetBooks'

const bookRoute = express.Router();

bookRoute.get('/', getBooks);
// bookRoute.post('/', createBook);

export default bookRoute;
