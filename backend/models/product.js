import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: {type: String, required: true},
    img: {type: String, required: true},
    price: {type: Number, required: true},
    rating: {type: Number, required: true},
    featured: {type: Boolean, required: true}
}, {});

const Product = mongoose.model('Product', productSchema);
export default Product;