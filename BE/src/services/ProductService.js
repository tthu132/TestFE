import Product from '../model/Product.js';

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, countInStock, price, rating, description, productCategory, idsImage, discount, exp, selled, donvi } = newProduct;

        try {
            const checkProduct = await Product.findOne({ name: name });
            if (checkProduct !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The name of product is already'
                });
                return; // thoát ra sau resolve
            }

            // Đảm bảo idsImage là mảng
            const imageList = Array.isArray(idsImage) ? idsImage : [idsImage];

            const newProductData = {
                name,
                discount,
                donvi,
                countInStock: Number(countInStock),
                price,
                rating,
                description,
                productCategory, // string hoặc enum
                idsImage: imageList, // mảng string
                exp,
                selled
            };

            const newProductCreated = await Product.create(newProductData);

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: newProductCreated
            });

        } catch (e) {
            reject(e.message);
        }
    });
};
const getDetailsProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })
            if (product === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            }
            product.firstImage = product.idsImage[0];
            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: product
            })
        } catch (e) {
            reject(e)
        }
    })
}
const getAllProduct = () => {
    return new Promise(async (resolve, reject) => {

        try {

            const data = await Product.find()

            resolve({
                status: 'OK',
                message: 'delete user SUCCESS',
                data
            })

        } catch (e) {
            console.log(e.message);
            reject(e)
        }
    })
}
export default {
    createProduct,
    getDetailsProduct,
    getAllProduct,
};