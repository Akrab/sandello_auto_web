import { sendGet, sendDelete } from "../basic";

export async function GetHistoryPriceParse(limit, offset) {
    return await sendGet({ url: '/api/v1/historyPriceParse', body: { limit: limit, offset: offset } });
};

export async function DeleteHistoryPriceParse(limit, offset) {
    return await sendDelete({ url: '/api/v1/historyPriceParse/delete', body: { limit: limit, offset: offset } });
};