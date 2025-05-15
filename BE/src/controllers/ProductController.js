import ProductService from '../services/ProductService.js';
import Product from '../model/Product.js';

const createProduct = async (req, res) => {
    try {
        const { name, countInStock, price, description, idProductCategory, idsImage } = req.body

        if (!name || !price) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is requireddd'
            })
        }
        const response = await ProductService.createProduct(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsProduct = async (req, res) => {
    try {
        const productId = req.params.id
        console.log('control')
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }
        const response = await ProductService.getDetailsProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const getAllProduct = async (req, res) => {
    try {

        const result = await ProductService.getAllProduct()
        return res.status(200).json(result)

    } catch (e) {
        return res.status(404).json({

            message: e.message
        })
    }
}
const search = async (req, res) => {
    try {
        const name = req.query.q;

        const allProducts = await Product.find();

        const normalizedKeyword = removeVietnameseTones(name).toLowerCase();

        const matchedProducts = allProducts.filter((product) => {
            const productName = removeVietnameseTones(product.name).toLowerCase();
            return productName.includes(normalizedKeyword);
        });

        if (matchedProducts.length === 0) {
            return res.json({ data: [] });
        }

        // Gán firstImage là ảnh đầu tiên nếu có
        const finalProducts = matchedProducts.map(product => {
            return {
                ...product.toObject(),
                firstImage: product.idsImage?.[0] || null
            }
        });

        res.json({
            data: finalProducts
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


function removeVietnameseTones(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}


export default {
    createProduct,
    getDetailsProduct,
    getAllProduct,
    search
};
