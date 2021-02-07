const { default: axios } = require("axios");

window.onload = () => {
    console.log("Loaded");
    // document.getElementById('test').addEventListener('click', () => communicator());
    let accessCode = getAccessCode() ; 
    if (accessCode !== null) {
        showUser(accessCode);
    } else {
    
        document.getElementById("linkSpotifyButton").addEventListener("click", function() {
            linkSpotify();
        });
    }
}

function getAccessCode() {
    const params = new URLSearchParams(url.search).get('code');
    if (params === "") {
        return null;
    }
    return params;
}
function linkSpotify() {
    // let newGroupButtons = `
    // <div class="col-12 col-md-6 p-4">
    //     <button id="createGroupButton" class="groupButton btn btn-outline-dark">
    //         Create Group
    //     </button>
    // </div>
    // <div class="col-12 col-md-6 p-4">
    //     <button id="joinGroupButton" class="groupButton btn btn-outline-dark">
    //         Join Group
    //     </button>
    // </div>
    // `

    // document.getElementById("groupButtons").innerHTML = newGroupButtons;
    // document.getElementById('test').addEventListener('click', communicator);

    // window.location = window.location + "static/authenticate";
    window.location = "https://hacklahoma2.herokuapp.com/static/authenticate";
}

function showUser(accessCode) {
    // Display User's name when logged in
    let username = `
    <div id="user" class="groupButton">
        Logged in as: Denny
    </div>
    `;
    document.getElementById("groupButtons").append(username);
}

function getUserInfo() {
    const user = await axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/me',
        headers: {
            Authorization: 'USER THING HERE'
        }
    });
    return user;
}