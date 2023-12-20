// Javascript for chat page


// ====== IMPORTS ======

import getRoomById from '../../server/functions/getRoomById';
import './chat.css';
import { io } from 'socket.io-client';

// ====== GLOBAL VARS ======

const socket = io();
const roomObj = await getRoomObject();
const userId = getUser();


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
    socket.emit('join', roomObj._id);
}

async function addMessage (messageObj) {
    
    console.log(messageObj);

    // User
    const messageSender = document.createElement('h3');
    messageSender.classList.add('sender');
    messageSender.innerText = messageObj.user;
    
    // Content
    const messageContent = document.createElement('p');
    messageContent.classList.add('message');
    messageContent.innerText = messageObj.content;
    

    // Assemble message article
    const messageArticle = document.createElement('article');
    messageArticle.classList.add('messageContainer');
    messageArticle.appendChild(messageSender);
    messageArticle.appendChild(messageContent);
    
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

async function getRoomObject () {
    const roomId = document.querySelector('.roomId').getAttribute('data-room-id');
    const response = await fetch(`/chat/room_obj/${roomId}`);
    return await response.json();
}

function addEventListeners () {
    addSendBtnListener();
}

function addSendBtnListener () {
    const sendBtn = document.querySelector('.sendBtn');
    sendBtn.addEventListener('click', sendBtnListener);
}

async function sendBtnListener () {
    const msgTextArea = document.querySelector('#msg');
    const msg = msgTextArea.value;

    socket.emit('message-from-client', {
        userId,
        roomId: roomObj._id,
        msg: msg
    });
}

// ====== MAIN ======

main();