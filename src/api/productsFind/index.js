import {  sendPost } from "../basic";

export async function GetProducts(data, limit, offset) {
    if (limit == null)
        limit = 10;

    if (offset == null)
        limit = 0;
    return await sendPost({ url: '/api/v1/findProducts', body: {data: data, limit: limit, offset: offset } });
};