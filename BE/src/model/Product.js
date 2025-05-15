import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        firstImage: { type: String },
        categoryName: { type: String },
        idsImage: [{ type: String }],
        type: { type: String },
        price: { type: Number, required: true },
        countInStock: { type: Number, required: true },
        rating: { type: Number, },
        description: { type: String },
        discount: { type: Number },
        selled: { type: Number, default: 0 },
        exp: { type: String },
        productCategory: { type: String }
    },
    {
        timestamps: true,
    }
);
const Product = mongoose.model('Product', productSchema);

export default Product;