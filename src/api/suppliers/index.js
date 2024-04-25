import { sendGet, sendPatch } from "../basic";

export async function GetSuppliers(limit, offset) {
    return await sendGet({ url: '/api/v1/suppliers', body: { limit: limit, offset: offset } });
};

export async function UpdateSupplier(body) {
    return await sendPatch({ url: '/api/v1/suppliers/update', body: body });
};