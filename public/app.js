// constants \\
const lastWord = document.getElementById('lastWord');
const wordList = document.getElementById('wordBox');

const input = document.getElementById('word');
const username = document.getElementById('username');

const LoginDisplay = document.getElementById('loginDisplay');
const LobbyDisplay = document.getElementById('lobbyDisplay');
const GameDisplay = document.getElementById('gameDisplay');

// server <=> client communications \\

const socket = io();

socket.on('submitWord', (word) => {
    lastWord.innerText = word.slice(0, word.length-1);
    const div = document.createElement('div');
    div.classList.add('word');
    div.id = word;
    div.innerText = word;
    wordList.appendChild(div);
    input.placeholder = word.charAt(word.length-1);
});

// display \\

// valid states: Login, Lobby, Game
var state = 'Login'

// define relavent methods

// function switches the displayed state
function display(){
    LoginDisplay.hidden = true;
    LobbyDisplay.hidden = true;
    GameDisplay.hidden = true;
    console.log(state)
    switch (state){
        case 'Login':
            LoginDisplay.hidden = false;
            document.getElementById('username').value = '';
            break;
        case 'Lobby':
            LobbyDisplay.hidden = false;
            onEnterEvent = joinRoom;
            break;
        case 'Game':
            GameDisplay.hidden = false;
            input.value = '';
            break;
    }
};

function login(){
    state = 'Game'; //Lobby
    display();
};

function submitWord(){
    wordInList = document.getElementById(input.value);
    if (wordInList){// repeat word
        wordInList.classList.add('repeat');
    } else if (/[^a-z]/i.test(input.value)){// word contains strange characters
        alert('words cannot contain spaces, numbers, punctuation, etc.\n Only english letters are permitted.');
    } else if (input.placeholder == input.value.charAt(0)){
        // correct starting letter send word submission
        socket.emit('submitWord', input.value);
    } else {
        // wrong starting letter
    }
    input.value = '';
};

// actions and events \\

// process inputs on enter
input.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') submitWord();
});

username.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') login();
});