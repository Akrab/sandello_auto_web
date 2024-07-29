import { sendGet, sendPost, sendPut } from "../basic";


export async function GetEnableSystem() {
    return await sendGet({ url: '/api/v1/stateSystem'});
};

export async function SetEnableSystem(body) {
    return await sendPut({ url: '/api/v1/stateSystem/update', body });
};

export async function SetSeller(body) {
    return await sendPost({ url: '/api/v1/selectSeller', body });
};
