import { sendGet } from "../basic";

export async function GetOrdes(limit, offset) {
    return await sendGet({ url: '/api/v1/orders',  header: { limit: limit, offset: offset }});
};