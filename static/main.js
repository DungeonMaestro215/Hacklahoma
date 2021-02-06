window.onload = () => {
    console.log("Loaded");
    // document.getElementById('test').addEventListener('click', () => communicator());
    
    document.getElementById("linkSpotifyButton").addEventListener("click", function() {
        linkSpotify();
    });
}

function linkSpotify() {
    let newGroupButtons = `
    <div class="col-12 col-md-6 p-4">
        <button id="createGroupButton" class="groupButton btn btn-outline-dark">
            Create Group
        </button>
    </div>
    <div class="col-12 col-md-6 p-4">
        <button id="joinGroupButton" class="groupButton btn btn-outline-dark">
            Join Group
        </button>
    </div>
    `

    document.getElementById("groupButtons").innerHTML = newGroupButtons;
}