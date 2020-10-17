import React, { Component } from "react";
import socketio from "socket.io-client";
import { BASE_URL } from "../config/url";
import "./Chat.scss";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      message: "Type a message",
    };

    this.socket = socketio.connect(BASE_URL);
    this.socket.emit("send_id", { uid: this.props.user.UID });
    this.socket.on("chat", (chat) => {
      chat = JSON.parse(chat);
      this.addChat(chat);
    });
  }

  statechange = (state) => this.setState(state);
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  componentDidMount = () => this.getChat();

  // 처음 채팅 눌렀을 때는 대화가 안뜬다 이상하다.

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.partner !== nextProps.partner) {
      this.getChat();
      return true;
    } else if (this.state !== nextState) return true;
    else return false;
  }

  closeChat = () => this.props.statechange({ chatPartner: null });

  getChat = () => {
    fetch(BASE_URL + "/chat/list/" + this.props.partner.UID)
      .then((res) => res.json())
      .then((json) => {
        console.log(json.result);
        this.setState({ chats: json.result });
      });
  };

  addChat = (chat) => {
    var chats = this.state.chats;
    chats.push(chat);
    this.setState({ chats: chats });
  };

  chat = () => {
    const { message } = this.state;
    const { partner, user } = this.props;
    this.socket.emit("chat", { uid: partner.UID, message: message });
    this.addChat({
      writer: user.UID,
      message: message,
    });
    this.setState({ message: "" });
  };

  render() {
    const { chats, message } = this.state;
    const { user, partner } = this.props;

    return (
      <div className="chatbox">
        <div className="chatbox-top">
          <div className="chatbox-avatar">
            <img src={partner.ImgUrl} alt="" />
          </div>
          <div className="chat-partner-name">{partner.Username}</div>
          <div className="chatbox-icons">
            <div onClick={this.closeChat}>
              <i className="fa fa-close"></i>
            </div>
          </div>
        </div>

        <div className="chat-messages">
          {chats.map((chat, idx) => (
            <div className="message-box-holder" key={idx}>
              {
                // Warning이 맞는 거다!
                chat.writer == partner.UID ? (
                  <div className="message-box message-partner">
                    {chat.message}
                  </div>
                ) : (
                  <div className="message-box">{chat.message}</div>
                )
              }
            </div>
          ))}
        </div>
        <div className="chat-input-holder">
          <textarea
            className="chat-input"
            name="message"
            value={message}
            onChange={this.onChange}
          />
          <input
            type="submit"
            value="Send"
            className="message-send"
            onClick={this.chat}
          />
        </div>
        {/* <div className="attachment-panel">
          <a href="#" className="fa fa-thumbs-up"></a>
          <a href="#" className="fa fa-camera"></a>
          <a href="#" className="fa fa-video-camera"></a>
          <a href="#" className="fa fa-image"></a>
          <a href="#" className="fa fa-paperclip"></a>
          <a href="#" className="fa fa-link"></a>
          <a href="#" className="fa fa-trash-o"></a>
          <a href="#" className="fa fa-search"></a>
        </div> */}
      </div>
    );
  }
}

export default Chat;
