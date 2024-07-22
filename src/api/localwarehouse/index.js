import { sendGet, sendPost } from "../basic";

export async function CreateNewLocalWarehouse(data) {
    return await sendPost({ url: '/api/v1/localwarehouses/create', body: { data : data } });
};

export async function ListLocalWarehouse(limit, offset) {
    return await sendGet({ url: '/api/v1/localwarehouses/list', header: { limit, offset} });
};

export async function LoadLocalWarehousesStruct(limit, offset) {
    return await sendGet({ url: '/api/v1/localwarehouses/structs' });
};

export async function CreateNewBox(body) {
    return await sendPost({ url: '/api/v1/localwarehouses/createNewBox', body: body });
};