const { default: axios } = require("axios");

window.onload = () => {
    console.log("Loaded");
    // document.getElementById('test').addEventListener('click', () => communicator());
    let accessCode = getAccessCode() ; 
    console.log("the acccess returned is \n" + accessCode);
    if (accessCode !== null) {
        showUser(accessCode);
    } else {
        document.getElementById("linkSpotifyButton").addEventListener("click", function() {
            linkSpotify();
        });
    }
}

function randomCode(length) {
    var result= '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
   return result;
}

function inputCode(code) {
    var code = code;
    if (code.length != 5) {
        return error;
    }
}

function getAccessCode() {
    const params = new URLSearchParams(window.location.search);

    if (params.has('code')) {
        let access = params.get('code');
        return access;
    } else {
        return null;
    }

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
    // document.getElementById("groupButtons").innerHTML = newGroupButtons;
    // document.getElementById("createGroupButton").addEventListener("click", function() {alert("Your code is: " + randomCode(5));})
    // document.getElementById("joinGroupButton").addEventListener('click', function() {
    //     inputCode(code);
    // })
    // document.getElementById('test').addEventListener('click', communicator);


