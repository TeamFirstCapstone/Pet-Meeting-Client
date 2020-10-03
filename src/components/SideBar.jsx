import React, { Component } from "react";
import PersonCard from "./PersonCard";
import PetCard from "./PetCard";
import "./SideBar.scss";
import { BASE_URL } from "../config/url";

class SideBar extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      pets: [],
      chats: [],
    };
  }
  componentDidMount() {
    fetch(BASE_URL + "/profile", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => (json.status ? this.setState(json.result) : null));
  }
  render() {
    const { user, pets, chats } = this.state;
    return (
      <nav id="sidebar">
        <div className="topbar">
          <i className="fas fa-bars"></i>
          <div className="title">Pet Meeting</div>
        </div>
        <div className="profile">
          <img className="profileImg" src={user.ImgUrl} alt="" />
          <div className="box">
            <div className="name">{user.Username}</div>
            <div className="setting">
              <div className="profileButton">Profile</div>
              <div className="settingButton">Setting</div>
            </div>
          </div>
        </div>
        <div className="pets">
          <div className="top">
            <div className="subtitle">Lover</div>
            <i className="fas fa-plus"></i>
          </div>
          <div className="pets_main">
            {pets.map((pet, idx) => (
              <PetCard {...pet} key={idx}></PetCard>
            ))}
          </div>
        </div>
        <div className="chats">
          <div className="top">
            <div className="subtitle">Chat</div>
            <i className="fas fa-plus"></i>
          </div>
          <div className="chats_main">
            {chats.map((chat, idx) => (
              <PersonCard {...chat} key={idx}></PersonCard>
            ))}
          </div>
        </div>
      </nav>
    );
  }
}

export default SideBar;
