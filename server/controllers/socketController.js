// Functions that work with socket connections


// ====== IMPORTS ======

// System
const path = require('path');

// Open Ai
const OpenAi = require('openai');

// Functions
const addMessage = require('../functions/addMessage.js');

// Environment Variables
require('dotenv').config({ path: path.join(__dirname, '../../config/.env')});


// ====== FUNCTIONS ======

function init (socket) {
    console.log('CLIENT CONNECTED:');
    console.log(socket.id);
    socket.on('message-from-client', handleNewMessage);
    socket.on('gpt-message-from-client', handleNewGPTMessage);
    socket.on('join', putUserInRoom);

    const io = this;

    async function handleNewMessage (messageObj) {
        console.log('ADDING MESSAGE TO ROOM: ' + messageObj.roomId);
        console.log(messageObj);
    
        try {
            await addMessage(messageObj.roomId, messageObj.userId, messageObj.content, messageObj.username);
            messageObj.date = new Date(Date.now());
            io.in(messageObj.roomId).emit('to-client-message', messageObj);
            socket.emit('message-posted', true);
        } catch (err) {
            console.log(err);
            socket.emit('error', err.message);
        }
    }
    
    async function handleNewGPTMessage (messageObj) {
        messageObj.prompt = messageObj.content;
        messageObj.username = `ChatGPT responding to ${messageObj.username}`


        try {
            const openAi = new OpenAi({
                apiKey: process.env.OPEN_AI_KEY,
                timeout: 180000
            });
            const completion = await openAi.chat.completions.create({
                messages: [{
                    role: "system",
                    content: messageObj.content,
                }],
                model: "gpt-3.5-turbo"
            });

            console.log('GPT RETURN:');
            console.log(completion.choices[0].message.content);

            messageObj.content = completion.choices[0].message.content;
        } catch (err) {
            console.log(err);
            messageObj.content = `I'm sorry, an error occured. Try again later.`;
        }

        try {
            await addMessage(messageObj.roomId, messageObj.userId, messageObj.content, messageObj.username, true, messageObj.prompt);
            messageObj.date = new Date(Date.now());
            messageObj.isGpt = true;
            io.in(messageObj.roomId).emit('to-client-message', messageObj);
            socket.emit('message-posted', true);
        } catch (err) {
            console.log(err);
            socket.emit('error', err.message);
        }
    }

    async function putUserInRoom (roomId) {
        socket.join(roomId);
    }
}



// ====== EXPORTS ======

module.exports = {
    init
}