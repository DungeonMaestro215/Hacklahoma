const { default: axios } = require("axios");

async function getUserInfo(accessCode) {
    console.log(accessCode);
    const user = await axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/me',
        headers: {
            'Authorization': 'Bearer ' + accessCode
        }
    });
    console.log(user);
    return user;
}

async function swapToken(accessCode) {
    const results = await axios({
        method: 'post',
        url: 'https://example.com/v1/swap',
        headers: {
            'content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
            'code': accessCode
        }
    });

    return results;
}