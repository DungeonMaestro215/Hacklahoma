window.onload = () => {
    console.log("Loaded");
    // document.getElementById('test').addEventListener('click', () => communicator());
    let accessCode = getAccessCode() ; 
    if (accessCode !== null) {

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