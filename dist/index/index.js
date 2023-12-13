/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// Javascript for index page

// ====== IMPORTS ======



// ====== FUNCTIONS ======

function main() {
  addEventsListeners();
}
function addEventsListeners() {
  addChatBtnListener();
}
function addChatBtnListener() {
  const newChatBtn = document.querySelector('.newChatBtn');
  newChatBtn.addEventListener('click', chatButtonListener);
  function chatButtonListener() {
    window.location.href = '/chat/start_chat';
  }
}

// ====== MAIN ======

main();
/******/ })()
;
//# sourceMappingURL=index.js.map