// Javascript for chat page


// ====== IMPORTS ======

import getRoomById from '../../server/functions/getRoomById';
import './chat.css';
import { io } from 'socket.io-client';

// ====== GLOBAL VARS ======

const socket = io();
const roomObj = await getRoomObject();
const userId = getUser();
const username = getUsername();


// ====== FUNCTIONS ======

async function main() {
    populateMessages();
    addEventListeners();

    setupSockets();
}

function setupSockets () {
    socket.on('to-client-message', addMessage);
    socket.on('error', handleSocketError);
    socket.on('dev-message', handleDevMessage);
    socket.on('message-posted', handleMessagePosted);
    socket.emit('join', roomObj._id);
}

function handleMessagePosted (status) {
    console.log('Status: ' + status);
    const msgTextArea = document.querySelector('#msg');
    msgTextArea.value = '';
}

async function addMessage (messageObj) {
    
    console.log(messageObj);

    // User
    const messageSender = document.createElement('h3');
    messageSender.classList.add('sender');
    messageSender.innerText = messageObj.username;
    
    // Content
    const messageContent = document.createElement('p');
    messageContent.classList.add('message');
    messageContent.innerText = messageObj.content;

    // Date
    const dateContent = document.createElement('p');
    dateContent.classList.add('date');
    dateContent.innerText = new Date(messageObj.date);
    

    // Assemble message article
    const messageArticle = document.createElement('article');
    messageArticle.classList.add('messageContainer');
    messageArticle.appendChild(messageSender);
    messageArticle.appendChild(messageContent);
    messageArticle.appendChild(dateContent);

    // Add to dom
    const messagesContainer = document.querySelector('.messages');
    messagesContainer.appendChild(messageArticle);

}

function handleDevMessage (messageObj) {
    console.log(messageObj);
}

function handleSocketError (err) {
    console.log(err);
}

async function populateMessages () {
    const room = await getRoomObject();
    const initialMessages = room.messages.sort((message1, message2) => {
        if (message1.date > message2.date) {
            return 1;
        } else {
            return -1;
        }
    });

    initialMessages.forEach((message) => {
        addMessage(message);
    });
}

function getUser () {
    return document.querySelector('.userId').getAttribute('data-user-id');
}

function getUsername () {
    return document.querySelector('.username').getAttribute('data-user-id');
}

async function getRoomObject () {
    const roomId = document.querySelector('.roomId').getAttribute('data-room-id');
    const response = await fetch(`/chat/room_obj/${roomId}`);
    return await response.json();
}

function addEventListeners () {
    addSendChatBtnListener();
    addSendGPTBtnListener();
    addInviteBtnListener();
    addInviteCloseBtnListener();
    addSubmitInviteBtnListener();
}

function addSendGPTBtnListener () {
    const sendGPTBtn = document.querySelector('.sendGPTBtn');

    sendGPTBtn.addEventListener('click', sendGPTBtnListener);
}

function sendGPTBtnListener (event) {

}

function addSubmitInviteBtnListener () {
    const submitInviteBtn = document.querySelector('.inviteModal .formInviteBtn');

    submitInviteBtn.addEventListener('click', submitInviteBtnListener);
}

async function submitInviteBtnListener (event) {
    hideInviteModal();

    const friendName = document.querySelector('#friendName').value;
    const roomId = document.querySelector('.roomId').getAttribute('data-room-id');

    try {
        const response = await fetch(`/chat/send_invite/${friendName}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                roomId
            })
        });

        const result = await response.json();
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}

function addInviteCloseBtnListener () {
    const inviteCloseBtn = document.querySelector('.inviteModal .closeBtn');

    inviteCloseBtn.addEventListener('click', inviteCloseBtnListener);
}

function inviteCloseBtnListener () {
    hideInviteModal();
}

function addInviteBtnListener () {
    const inviteBtn = document.querySelector('.inviteBtn');

    inviteBtn.addEventListener('click', inviteBtnListener);
}

function inviteBtnListener () {
    showInviteModal();
}

function showInviteModal () {
    const inviteModal = document.querySelector('.inviteModal');
    inviteModal.style.display = 'flex';
}

function hideInviteModal () {
    const inviteModal = document.querySelector('.inviteModal');
    inviteModal.style.display = 'none';
}

function addSendChatBtnListener () {
    const sendChatBtn = document.querySelector('.sendChatBtn');
    sendChatBtn.addEventListener('click', sendChatBtnListener);
}

async function sendChatBtnListener () {
    const msgTextArea = document.querySelector('#msg');
    const msg = msgTextArea.value;

    socket.emit('message-from-client', {
        userId,
        roomId: roomObj._id,
        content: msg,
        username
    });
}

// ====== MAIN ======

main();