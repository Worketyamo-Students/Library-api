import express from "express";
import bodyParser from "body-parser";
import userRoutes from './routes/userRoutes'
import bookRoutes from './routes/bookRoutes'
const app = express();

app.use(bodyParser.json());
app.use('/users',userRoutes);
app.use('/books',bookRoutes);

export default app;