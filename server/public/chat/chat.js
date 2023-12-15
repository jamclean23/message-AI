/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// Javascript for chat page

// ====== IMPORTS ======



// ====== FUNCTIONS ======

async function main() {
  const roomId = await getRoomObject();
  console.log(roomId);
}
async function getRoomObject() {
  const roomId = document.querySelector('.roomId').getAttribute('data-room-id');
  const response = await fetch(`/chat/room_obj/${roomId}`);
  return await response.json();
}

// ====== MAIN ======

main();
/******/ })()
;
//# sourceMappingURL=chat.js.map