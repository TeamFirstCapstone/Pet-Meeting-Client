import socketio from "socket.io-client";
const { BASE_URL } = require("../config/url");

function connect(uid, addChat) {
  const socket = socketio.connect(BASE_URL);
  socket.emit("send_id", { uid });

  socket.on("chat", (chat) => {
    chat = JSON.parse(chat);
    addChat(chat);
  });
}

function get(receiverId) {}

/**
 * Sever listen like this
 * connection {}
 * disconnect {}
 * login      {}
 * chat       { receiverId, message } => chat { senderId, message }
 * getChat    { receiverId, offset, limit} => getChat [{writers, messages, dates}]
 */
