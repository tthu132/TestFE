import axios from "axios";

const ProductService = {
  getAllProduct: async () => {
    const response = await axios.get(`http://localhost:5000/product/get-all`);
    return response.data;
  },
  getDetailsProduct: async (id: string) => {
    const response = await axios.get(`http://localhost:5000/product/detail/${id}`);
    return response.data;
  }
};

export default ProductService;