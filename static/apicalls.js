async function getUserInfo(accessCode) {
    const user = await axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/me',
        header: {
            Authorization: 'Bearer ' + accessCode
            // Authorization: 'Bearer ' + Buffer.from(accessCode).toString('base64') 
        }
    });
    console.log(user);
    return user;
}