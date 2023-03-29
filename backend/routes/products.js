import express from 'express';
import Product from '../models/product.js';
import authentication from '../middleware/authentication.js';

const productRouter = express.Router();
productRouter.use(authentication);

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