window.onload = () => {
    console.log("Loaded");
    // document.getElementById('test').addEventListener('click', () => communicator());
    
    // document.getElementById("linkSpotifyButton").addEventListener("click", function() {
    //     linkSpotify();
    // });
    let accessCode = getAccessCode() ; 
    console.log("the acccess returned is \n" + accessCode);
    if (accessCode !== null) {
        showUser();
    } else {
        let groupButtonsDiv = document.getElementById("groupButtons");

        let loginButtonDiv = document.createElement("div");
        loginButtonDiv.setAttribute("class", "col- 12 col-md-6 p-4")

        let button = document.createElement("button");
        button.setAttribute("id", "linkSpotifyButton");
        button.setAttribute("class", "groupButton btn btn-outline-dark");
        button.innerText = "Link Spotify :)"

        loginButtonDiv.appendChild(button);
        groupButtonsDiv.appendChild(loginButtonDiv);
        

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

function showUser() {
    // Display User's name when logged in
    let username = document.createElement('div');
    username.setAttribute('id', 'user');
    username.innerHTML = `Logged in as: ${getUserInfo(accessCode).display_name}`;
    document.getElementById("container").appendChild(username);
}

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
    // document.getElementById("groupButtons").innerHTML = newGroupButtons;
    // document.getElementById("createGroupButton").addEventListener("click", function() {alert("Your code is: " + randomCode(5));})
    // document.getElementById("joinGroupButton").addEventListener('click', function() {
    //     inputCode(code);
    // })
    // document.getElementById('test').addEventListener('click', communicator);


