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