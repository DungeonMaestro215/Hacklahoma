const axios = require('axios').default;

async function getUserInfo() {
    const user = await axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/me',
        headers: {
            Authorization: accessCode
        }
    });
    return user;
}