import express from 'express';
import Product from '../models/product.js';

const productRouter = express.Router();

productRouter.get("/featured", async (req, res) => {
    const products = await Product.find({featured: true});
    if (products) {
        res.send(products);
    } else {
        console.log("No products found");
        res.send([]);
    }
})

export default productRouter;