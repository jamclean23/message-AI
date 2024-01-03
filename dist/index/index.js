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
  addNewChatBtnListener();
  addChatLinkListeners();
  addInviteBtnListeners();
}
function addInviteBtnListeners() {
  const acceptBtn = document.querySelector('.acceptInviteBtn');
  if (acceptBtn) {
    acceptBtn.addEventListener('click', acceptBtnListener);
  }
  const ignoreBtn = document.querySelector('.ignoreInviteBtn');
  if (ignoreBtn) {
    ignoreBtn.addEventListener('click', ignoreBtnListener);
  }
}
async function acceptBtnListener(event) {
  const roomId = event.target.parentElement.parentElement.getAttribute('data-room-id');
  const response = await fetch(`/accept_invite/${roomId}`, {
    method: 'POST'
  });
  const result = await response.json();
  if (result.success) {
    ignoreBtnListener(event);
    window.location.reload();
  }
}
async function ignoreBtnListener(event) {
  const roomId = event.target.parentElement.parentElement.getAttribute('data-room-id');
  const response = await fetch(`/ignore_invite/${roomId}`, {
    method: 'DELETE'
  });
  const result = await response.json();
  if (result.success) {
    // Find the dom article and start removal animation
    const inviteArticle = findArticleByRoomId(roomId);
    startRemoveArticleAnimation(inviteArticle);
  }
}
function startRemoveArticleAnimation(article) {
  article.addEventListener('animationend', removeArticleEndHandler);
  article.classList.add('removing');
}
function removeArticleEndHandler(event) {
  if (event.animationName === 'removing') {
    event.target.remove();
  }
}
function findArticleByRoomId(roomId) {
  const inviteArticles = document.querySelectorAll('.invite.link');
  let result = null;
  if (inviteArticles) {
    inviteArticles.forEach(inviteArticle => {
      if (inviteArticle.getAttribute('data-room-id') === roomId) {
        result = inviteArticle;
      }
    });
    return result;
  } else {
    return null;
  }
}
function addChatLinkListeners() {
  const chatLinks = document.querySelectorAll('.chat.active');
  chatLinks.forEach(chatLink => {
    chatLink.addEventListener('click', chatLinkClickHandler);
  });
}
function chatLinkClickHandler(event) {
  window.location.href = `/chat/${event.target.getAttribute('data-room-id')}`;
}
function addNewChatBtnListener() {
  const newChatBtn = document.querySelector('.newChatBtn');
  newChatBtn.addEventListener('click', newChatButtonListener);
  function newChatButtonListener() {
    window.location.href = '/chat/start_chat';
  }
}

// ====== MAIN ======

main();
/******/ })()
;
//# sourceMappingURL=index.js.map