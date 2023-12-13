/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// Javascript for index page

// ====== IMPORTS ======



// ====== FUNCTIONS ======

function main() {
  if (performance.getEntries()[0].type === "back_forward") {
    location.reload();
  }
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