import express from "express";
import bodyParser from "body-parser";
import userRoutes from './routes/userRoutes'
import bookRoute from "./routes/bookReoutes";
const app = express();

app.use(bodyParser.json());
app.use('/users',userRoutes);
app.use('/books',bookRoute);

export default app;