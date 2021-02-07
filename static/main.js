let accessCode = null;
let theName = null; 

window.onload = () => {
    console.log("Loaded");
    // document.getElementById('test').addEventListener('click', () => communicator());

    let num1 = document.getElementById("num1");
    let num2 = document.getElementById("num2");
    let num3 = document.getElementById("num3");
    let num4 = document.getElementById("num4");
    let num5 = document.getElementById("num5");
    let codeSubmitButton = document.getElementById("codeSubmitButton");

    let currentKey = num1;
    num1.focus();
    num1.addEventListener("keyup", function(e){
        if ((e.keyCode >= 48 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105)) {
            num2.focus();
        } else if (e.keyCode === 8) {
        }
        
    });
    num2.addEventListener("keyup", function(e){
        if ((e.keyCode >= 48 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105)) {
            num3.focus();
        } else if (e.keyCode === 8) {
            num1.value = "";
            num1.focus();
        }
    });
    num3.addEventListener("keyup", function(e){
        if ((e.keyCode >= 48 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105)) {
            num4.focus();
        } else if (e.keyCode === 8) {
            num2.value = "";
            num2.focus();
        }
    });
    num4.addEventListener("keyup", function(e){
        if ((e.keyCode >= 48 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105)) {
            num5.focus();
        } else if (e.keyCode === 8) {
            num3.value = "";
            num3.focus();
        }
    });
    num5.addEventListener("keyup", function(e){
        if ((e.keyCode >= 48 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105)) {
            codeSubmitButton.focus();
        } else if (e.keyCode === 8) {
            num4.value = "";
            num4.focus();
        }
    });
    codeSubmitButton.addEventListener("keyup", function(e){
        if (e.keyCode === 8) {
            num5.value = "";
            num5.focus();
        }
    });

    codeSubmitButton.addEventListener("click", function(e){
        let code = (num1.value + num2.value + num3.value + num4.value + num5.value).toUpperCase();
        if (code.length === 5) {
            submitGroupCode(code);
        }
    });

    //attempts to get the accessCode
    accessCode = getAccessCode() ; 
    console.log("the acccess returned is \n" + accessCode);


    //decides if the access code is there or not
    if (accessCode !== null) {
        console.log(await swapToken(accessCode));
        showUser(accessCode);    
        renderGroupButtons();

    } else {
        renderLoginButton();
    }

    
}

function randomCode(length) {
    var result= '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    let codes = [];
    for (let i = 0; i < codes.length + 1; i++) {
        codes[i] = result;
    }
    // export {codes};
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

function renderLoginButton() {
    //gets the button div to append the rest to it
    let groupButtonsDiv = document.getElementById("groupButtons");

    //creates the login button div
    let loginButtonDiv = document.createElement("div");
    loginButtonDiv.setAttribute("class", "col- 12 col-md-6 p-4")

    //creates the button div
    let button = document.createElement("button");
    button.setAttribute("id", "linkSpotifyButton");
    button.setAttribute("class", "groupButton btn btn-outline-dark");
    button.innerText = "Link Spotify :)"

    //appends the button to the div
    loginButtonDiv.appendChild(button);
    groupButtonsDiv.appendChild(loginButtonDiv);

    //adds the button listener
    document.getElementById("linkSpotifyButton").addEventListener("click", function() {
        linkSpotify();
    });
    return;

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

function renderGroupButtons() {
    //gets the div to append buttons
    let buttonGroup = document.getElementById("groupButtons");

    //makes the first button
    let overallClass1 = document.createElement("div");
    overallClass1.setAttribute("class", "col-12 col-md-6 p-4");

    let buttonCreate = document.createElement("button");
    buttonCreate.setAttribute("id", "createGroupButton");
    buttonCreate.setAttribute("class", "groupButton btn btn-outline-dark");
    buttonCreate.innerText = "Create Group";
    buttonCreate.addEventListener("click", createGroupEvent);
    //appends the first button
   
    overallClass1.appendChild(buttonCreate);
    buttonGroup.appendChild(overallClass1);


    //makes the second button 
    let overallClass2 = document.createElement("div");
    overallClass2.setAttribute("class", "col-12 col-md-6 p-4");

    let buttonJoin = document.createElement("button");
    buttonJoin.setAttribute("id", "joinGroupButton");
    buttonJoin.setAttribute("class", "groupButton btn btn-outline-dark");
    buttonJoin.innerText = "Join Group";
    buttonJoin.addEventListener("click", joinGroupEvent);

    //appends second buttons
    overallClass2.appendChild(buttonJoin);
    buttonGroup.appendChild(overallClass2);
    return;
}
function linkSpotify() {
    window.location = "https://hacklahoma2.herokuapp.com/static/authenticate";
}

async function createGroupEvent() {
    //makes search div
    let overallDiv = document.createElement("div")
    overallDiv.setAttribute("id", "searchDiv");

    //makes search bar
    let searchBar = document.createElement("input");
    searchBar.setAttribute("id", "searchBar");
    searchBar.setAttribute("type", "text");
    searchBar.setAttribute("placeholder", "Search for a Song");

    //makes button
    let enterButton = document.createElement("button");
    enterButton.setAttribute("id", "searchButton");
    enterButton.setAttribute("class", "groupButton btn btn-outline-dark");
    enterButton.innerText = "Search";

    //appends the button and search bar
    overallDiv.appendChild(searchBar);
    overallDiv.appendChild(enterButton);

    //replaces buttons with search bar
    document.getElementById("groupButtons").replaceWith(overallDiv);

    // Get Code
    let code = await axios({
        method: 'get',
        url: `https://hacklahoma2.herokuapp.com/getCode`
    });
    console.log(code);
}

function joinGroupEvent() {
    let joinCodeHTML = `
    <div id="joinCode" class="row input-group pt-5">
        <input id="1num" class="joinCodeNum" type="text">
        <input id="2num" class="joinCodeNum" type="text">
        <input id="3num" class="joinCodeNum" type="text">
        <input id="4num" class="joinCodeNum" type="text">
        <input id="5num" class="joinCodeNum" type="text">
    </div> 
    `
    document.getElementById("groupButtons").replaceWith(joinCodeHTML);
}

async function showUser() {
    // Display User's name when logged in
    let username = document.createElement('div');
    username.setAttribute('id', 'user');
    let response = await getUserInfo(accessCode);
    theName = response.data.display_name;

    username.innerHTML = `Logged in as: ${theName}`;
    document.getElementById("container").appendChild(username);
}

function submitGroupCode(code) {
    console.log(code);
}

    // document.getElementById("groupButtons").innerHTML = newGroupButtons;
    // document.getElementById("createGroupButton").addEventListener("click", function() {alert("Your code is: " + randomCode(5));})
    // document.getElementById("joinGroupButton").addEventListener('click', function() {
    //     inputCode(code);
    // })
    // document.getElementById('test').addEventListener('click', communicator);

//hi simon
