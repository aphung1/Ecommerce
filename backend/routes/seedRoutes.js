import express from 'express';
import Product from '../models/product.js';
import data from '../sample_data.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
    await Product.deleteMany({});
    const newProducts = await Product.insertMany(data);
    res.send({newProducts});
});

export default seedRouter;