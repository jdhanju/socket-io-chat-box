

var username = "unknown";
username = prompt("Please enter your name", "unknown");

let socket = io();

socket.on('connect', function() {
    var msg = username + " has connected"
    socket.emit('chat', msg)
})

socket.on('clientChange', function(clients) {
    document.querySelector("#number").innerHTML = clients + " clients connected"
})

socket.on('message', function(message) {
    // console.log(message)
    printMessage(message)
})

socket.on('whoClicked', function(message) {
    printWhoClicked(message);
})

document.getElementById('discon').onclick = function() {
    socket.emit('chat', `${username} has dicsonnected`)

    socket.close()
}

function sub() {
    var input = document.getElementById("message")
    var msg = username + ": " + input.value
    socket.emit('chat', msg)
    input.value = ''
}

function whoClicked() {
    var msg = username + " clicked the button"
    socket.emit('who', msg);
}

document.forms[0].onsubmit = sub

function printMessage(message) {
    var p = document.createElement("p")
    p.innerHTML = message
    document.querySelector("div#messages").appendChild(p)
}

function printWhoClicked(message) {
    console.log("who");
    var p = document.createElement("p");
    p.innerHTML = message;
    document.querySelector("div#who-clicked").appendChild(p);
}