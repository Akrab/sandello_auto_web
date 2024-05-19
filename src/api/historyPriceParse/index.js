import { sendGet, sendDelete } from "../basic";

export async function GetHistoryPriceParse(limit, offset) {
    return await sendGet({ url: '/api/v1/historyPriceParse', header: { limit: limit, offset: offset } });
};

export async function DeleteHistoryPriceParse(id) {
    return await sendDelete({ url: '/api/v1/historyPriceParse/delete', body: { id: id } });
};