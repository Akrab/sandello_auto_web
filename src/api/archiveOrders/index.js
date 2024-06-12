import { sendGet, sendPut } from "../basic";

export async function GetOrders(limit, offset) {
    return await sendGet({ url: 'api/v1/archiveOrders',  header: { limit: limit, offset: offset }});
};
