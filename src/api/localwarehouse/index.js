import { sendGet, sendPost } from "../basic";

export async function CreateNewLocalWarehouse(data) {
    return await sendPost({ url: '/api/v1/localwarehouses/create', body: { data : data } });
};