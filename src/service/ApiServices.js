import axios from 'axios';

const URL_CATE = "https://dummyjson.com/products/categories";
const API_LIST_PRODUCT = "https://dummyjson.com/products";
const API_GET_PRODUCT_BY_CATEGORY = "https://dummyjson.com/products/category";

const ApiService = {
    ListCategories: async () => {
        return await axios(URL_CATE)
    },
    ListProduct: async () => {
        return await axios(API_LIST_PRODUCT)
    },
    GetDetailProduct: async (id) => {
        return await axios(`${API_LIST_PRODUCT}/${id}`)
    },
    GetProductsByCategory: async (category) => {
        return await axios(`${API_GET_PRODUCT_BY_CATEGORY}/${category}`)
    }
}

export default ApiService;
