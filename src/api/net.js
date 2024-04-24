import axios from "axios";

export async function sendPost(params) {
    var url = params.url;
    var body = params.body;

    return new Promise(function(resolve, reject) {
        axios
        .post(url, body)
        .then(function(response) {
            resolve(response);
        })
        .catch(function(error) {
            reject(error)
        });
    })
}

export async function sendGet(params) {
    var url = params.url;
    var body = params.body;

    return new Promise(function(resolve, reject) {
        axios
        .get(url, body)
        .then(function(response) {
            resolve(response);
        })
        .catch(function(error) {
            reject(error)
        });
    })
}

export async function sendPut(params) {
    var url = params.url;
    var body = params.body;

    return new Promise(function(resolve, reject) {
        axios
        .put(url, body)
        .then(function(response) {
            resolve(response);
        })
        .catch(function(error) {
            reject(error)
        });
    })
}

export async function sendPatch(params) {
    var url = params.url;
    var body = params.body;

    return new Promise(function(resolve, reject) {
        axios
        .patch(url, body)
        .then(function(response) {
            resolve(response);
        })
        .catch(function(error) {
            reject(error)
        });
    })
}

export async function sendDelete(params) {
    var url = params.url;
    var body = params.body;

    return new Promise(function(resolve, reject) {
        axios
        .delete(url, body)
        .then(function(response) {
            resolve(response);
        })
        .catch(function(error) {
            reject(error)
        });
    })
}


