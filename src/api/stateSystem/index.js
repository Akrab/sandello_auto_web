import { sendGet, sendPut } from "../basic";


export async function GetEnableSystem() {
    return await sendGet({ url: '/api/v1/stateSystem'});
};

export async function SetEnableSystem(body) {
    return await sendPut({ url: '/api/v1/stateSystem/update', body });
};