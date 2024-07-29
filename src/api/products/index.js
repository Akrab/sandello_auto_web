import { sendGet, sendPost } from "../basic";

export async function GetProducts(limit, offset) {
    return await sendGet({ url: '/api/v1/products', body: { limit: limit, offset: offset } });
};

export async function GetAllProductsByFilter(obj) {
    return await sendPost({ url: '/api/v1/allProducts', body: obj });
};