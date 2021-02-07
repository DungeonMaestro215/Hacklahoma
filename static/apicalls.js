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

async function getToken(codeParam) {
    console.log("Code" + codeParam)
    let params = {
        grant_type: "authorization_code",
        code: codeParam, 
        redirect_uri: 'https://hacklahoma2.herokuapp.com/static/',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
      };
    let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    try  {
        const results = await axios({
            method: 'post',
            url: `https://accounts.spotify.com/api/token`,
            data: queryString,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
            
        });
        return results;
    }
    catch (error) {
        return error;
    }
}

async function searchSong(codeParam, searchTerm) {
    let params = {
        code: codeParam, 
        q: searchTerm,
        type: 'track',
        limit: 1
      };
    let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');

    try  {
        const results = await axios({
            method: 'get',
            url: `https://api.spotify.com/v1/search`,
            data: queryString
            
        });
        return results;
    }
    catch (error) {
        return error;
    }

}