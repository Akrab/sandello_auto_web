import { sendGet, sendPost, sendPut } from "../basic";

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

export async function AddNewProduct(body) {
    return await sendPost({ url: '/api/v1/localwarehouses/addNewProduct', body: body });
};

export async function ListProducts(body) {
    return await sendPost({ url: '/api/v1/localwarehouses/products', body: body });
};

export async function ProductBoxInfo(boxProductId) {
    return await sendGet({ url: '/api/v1/localwarehouses/productBoxInfo', header: { boxProductId}  });
};

export async function UpdateBoxProductData(body) {
    return await sendPut({ url: '/api/v1/localwarehouses/updateProduct', body : body  });
};



