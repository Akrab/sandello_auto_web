
import { sendPost, sendGet, sendPut, sendPatch, sendDelete } from "./net";

export async function GetSuppliers(limit, offset) {
    return sendGet({ url: '/api/v1/suppliers', body: { limit: limit, offset: offset } });
};

export async function UpdateSupplier(body) {
    return sendPatch({ url: '/api/v1/suppliers/update', body: body });
};

export async function GetBrandNames(limit, offset) {
    return sendGet({ url: '/api/v1/brands', body: { limit: limit, offset: offset } });
};

export async function UpdateBrandName(body) {
    return sendPatch({ url: '/api/v1/brands/update', body: body });
};

export async function GetSurcharges(limit, offset) {
    return sendGet({ url: '/api/v1/surcharges', body: { limit: limit, offset: offset } });
};

export async function UpdateSurcharges(body) {
    return sendGet({ url: '/api/v1/surcharges/update', body: body });
};

export async function GetHistoryPriceParse(limit, offset) {
    return sendGet({ url: '/api/v1/historyPriceParse',  body: { limit: limit, offset: offset } });
};

export async function DeleteHistoryPriceParse(limit, offset) {
    return sendDelete({ url: '/api/v1/historyPriceParse/delete',  body: { limit: limit, offset: offset } });
};

export async function GetOrdes(limit, offset) {
    return sendGet({ url: '/api/v1/orders',  body: { limit: limit, offset: offset } });
};

export async function GetProducts(limit, offset) {
    return sendGet({ url: '/api/v1/products',  body: { limit: limit, offset: offset } });
};

