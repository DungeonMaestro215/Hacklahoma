async function getUserInfo(accessCode) {
    const user = await axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/me',
        headers: {
            Authorization: accessCode
        }
    });
    return user;
}