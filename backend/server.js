import express from 'express';
import mongoose from 'mongoose';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/products.js';
import authRouter from './routes/authRoutes.js';
import * as dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
dotenv.config()

const app = express();
app.use(express.json());
app.use(cookieParser());

const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI, {useNewURLParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .then(() => console.log("listening"))
    .catch((err) => console.log(err));

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/auth', authRouter);