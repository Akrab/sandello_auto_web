import { sendGet, sendPut } from "../basic";

export async function GetOrders(limit, offset) {
    return await sendGet({ url: '/api/v1/orders',  header: { limit: limit, offset: offset }});
};

export async function AcceptTheOrderProdectToProcess(body) {
    return await sendPut({ url: '/api/v1/orders/takeToProcess',  body: body});
};