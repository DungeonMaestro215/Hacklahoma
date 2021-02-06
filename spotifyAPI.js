// this is REALLY bad practice, this should be an environmnet var but this is a hackathon
const CLIENT_ID  = '21df40a4eb444b25b9616bbc727d3ecf'
const CLIENT_SECRET = '265599f1a8a142148b7a101b695a317a'


/** git notes
 * git add *
 * git stash
 * git pull
 * git stash pop
 */

 //using axios 
 const axios = require('axios').default;


//https://developer.spotify.com/documentation/general/guides/authorization-guide/
/**this returns a body with json format
{
   "access_token": "NgCXRK...MzYjw",
   "token_type": "Bearer",
   "scope": "user-read-private user-read-email",
   "expires_in": 3600,
   "refresh_token": "NgAagA...Um_SHo"
}
 */
async function getAuth() {
    try  {
        const results = await axios({
            method: 'post',
            url: `https://accounts.spotify.com/api/token`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64') // client id and secret from env
              },
            data: { 
              grant_type: 'authorization_code',
              code: '/authorize endpoint', 
              redirect_uri: 'https://wbucher3.github.io/background.html'
            }
            
        });
        return results;
    }
    catch (error) {
        return error;
    }
}

//gets the current user's id, needed for all other calls
async function getCurrentUser(token) {
    try  {
        const results = await axios( {
            method: 'get',
            url: 'https://api.spotify.com/v1/me',
            header: {
                'Authorization':'Bearer ' + token,
                'Content-Type': 'application/json'
            }
            
        });
        return results;
    }
    catch (error) {
        return error;
    }
}


//creates a new playlist
async function CreatePlaylist(playlistName) {
    try  {
        const results = await axios( {
            method: 'post',
            url: 'https://api.spotify.com/v1/users/{user_id}/playlists',
            body: {
                name: playlistName, 

            }

        });
    }
    catch (error) {
        return error;
    }

}

async function main() {
    let test = await getAuth()
    console.log(test);
}
main();