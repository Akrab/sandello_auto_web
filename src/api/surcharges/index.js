import { sendGet } from "../basic";

export async function GetSurcharges(limit, offset) {
    return await sendGet({ url: '/api/v1/surcharges', body: { limit: limit, offset: offset } });
};

export async function UpdateSurcharges(body) {
    return await sendGet({ url: '/api/v1/surcharges/update', body: body });
};