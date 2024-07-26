import axios from "axios";


async function sendAxiosGetRequset(params) {
    try {
        let header = params.header ?? {};

        const response = await axios.get(params.url, { params: header })

        let data = await response.data;
        data.status = data.status || "error";
        return data;
    } catch (err) {
        console.log(err);
        return { status: "error", code: -2, message: "network error" };
    };
}

async function sendRequest(method, params) {
    try {

        let url = params.url;
        let body = (method === "GET" || method === "HEAD") ? null : params.body;
        params.headers = params.header || {};

        let response = await fetch(url, {
            headers: params.headers ,
            method: method,
            body: body ? JSON.stringify(body) : undefined
        });
        let data = await response.json();
        data.status = data.status || "error";
        return data;
    } catch (err) {
        console.log(err);
        return { status: "error", code: -2, message: "network error" };
    };
};


export const sendGet = async (params) => sendRequest("GET", params);
export const sendPatch = async (params) => await sendRequest("PATCH", params);
export const sendPost = async (params) => await sendRequest("POST", params);
export const sendPut = async (params) => await sendRequest("PUT", params);
export const sendDelete = async (params) => await sendRequest("DELETE", params);