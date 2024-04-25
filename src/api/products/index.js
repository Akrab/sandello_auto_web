import { sendGet } from "../basic";

export async function GetProducts(limit, offset) {
    return await sendGet({ url: '/api/v1/products', body: { limit: limit, offset: offset } });
};