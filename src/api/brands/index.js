import { sendGet, sendPatch } from "../basic";

export async function GetBrandNames(limit, offset) {
    return await sendGet({ url: '/api/v1/brands', body: { limit: limit, offset: offset } });
};

export async function UpdateBrandName(body) {
    return await sendPatch({ url: '/api/v1/brands/update', body: body });
};