// Javascript for index page


// ====== IMPORTS ======

import './index.css';


// ====== FUNCTIONS ======

function main () {
    addEventsListeners();
}

function addEventsListeners () {
    addChatBtnListener();
}

function addChatBtnListener () {
    const newChatBtn = document.querySelector('.newChatBtn');

    newChatBtn.addEventListener('click', chatButtonListener);

    function chatButtonListener () {
        window.location.href = '/chat?room=blah';
    }
}

// ====== MAIN ======

main();
