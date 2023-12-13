// Javascript for index page


// ====== IMPORTS ======

import './index.css';


// ====== FUNCTIONS ======

function main () {
    if (performance.getEntries()[0].type === "back_forward") {
        location.reload();
    }

    addEventsListeners();
}

function addEventsListeners () {
    addChatBtnListener();
}

function addChatBtnListener () {
    const newChatBtn = document.querySelector('.newChatBtn');

    newChatBtn.addEventListener('click', chatButtonListener);

    function chatButtonListener () {
        window.location.href = '/chat/start_chat';
    }
}

// ====== MAIN ======

main();
