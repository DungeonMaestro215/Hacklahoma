// this is REALLY bad practice, this should be an environmnet var but this is a hackathon
const CLIENT_ID  = '21df40a4eb444b25b9616bbc727d3ecf'
const CLIENT_SECRET = '265599f1a8a142148b7a101b695a317a'


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

async function getToken(code) {
    try  {
        const results = await axios({
            method: 'post',
            url: `https://accounts.spotify.com/api/token`,
            data: {
              grant_type: "authorization_code",
              code: code, 
              redirect_uri: 'https://hacklahoma2.herokuapp.com/static/',
            },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Basic ' + btoa(CLIENT_ID  + ":" + CLIENT_SECRET)
            }
            
        });
        return results;
    }
    catch (error) {
        return error;
    }
}