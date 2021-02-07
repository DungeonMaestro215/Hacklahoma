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

/**FORMAT FOR SAVING THE SONGS 
 * spotify:track:4iV5W9uYEdYUVa79Axb7Rh
 * store each song in an array in this format of the uri
 * spotify:track:id
 * basically save the URI not the id
 */
async function searchSong(codeParam, searchTerm) {
    console.log("Token: " + codeParam);
    let parameters = { 
        q: searchTerm,
        type: 'track',
        limit: 1
      };
    params = Object.keys(parameters).map(key => key + '=' + parameters[key]).join('&');
    console.log(queryString);

    try  {
        const results = await axios({
            method: 'get',
            url: `https://api.spotify.com/v1/search`,
            params,
            headers: {
                Authorization: 'Bearer ' + codeParam
            }
            
        });
        return results;
    }
    catch (error) {
        return error;
    }

}

async function addSongsToPlaylist(codeParam, songList, playlistID) {
    let params = {
        code: codeParam,
        uris: songList //string array of spotify uri's https://developer.spotify.com/documentation/web-api/reference/#endpoint-add-tracks-to-playlist
                /** [ "spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M", ... ] */
    };
    let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');

    try  {
        const results = await axios({
            method: 'post',
            url: `https://api.spotify.com/v1/playlists/`+playlistID+`/tracks`,
            data: queryString,
            headers: {
                'Content-Type': 'application/json',
              }
            
        });
        return results;
    }
    catch (error) {
        return error;
    }
}


//MAKE SURE TO SAVE THE RESPONSE WITH THE PLAYLIST ID!!!!!
// we need it to add songs and for other users to follow it
async function createPlaylist(codeParam, userID, playlistName) {
    let params = {
        code: codeParam,
        name: playlistName,
        public: true, 
      };
    let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');

    try  {
        const results = await axios({
            method: 'post',
            url: `https://api.spotify.com/v1/users/`+userID+`/playlists`,
            data: queryString,
            headers: {
                'Content-Type': 'application/json',
              }
            
        });
        return results;
    }
    catch (error) {
        return error;
    }
}



async function followPlaylist(codeParam, playlistID) {
    let params = {
        code: codeParam, 
      };
    let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');

    try  {
        const results = await axios({
            method: 'put',
            url: `https://api.spotify.com/v1/playlists/`+ playlistID+ `/followers`,
            data: queryString,
            headers: {
                'Content-Type': 'application/json',
              }
            
        });
        return results;
    }
    catch (error) {
        return error;
    }
}