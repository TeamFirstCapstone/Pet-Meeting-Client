import React, { Component } from "react";
import PersonCard from "./PersonCard";
import PetCard from "./PetCard";
import "./SideBar.scss";
import { BASE_URL } from "../config/url";

class SideBar extends Component {
  constructor(props) {
    super();
    this.state = {
      id: props.id,
      user: {},
      pets: [],
      chats: [],
    };

    fetch(BASE_URL + "/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: this.state.id }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json.result);
        return json.status ? this.setState(json.result) : null;
      });
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
          <img className="profileImg" src={user.imgUrl} alt="" />
          <div className="box">
            <div className="name">{user.name}</div>
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
            {pets.map((pet) => (
              <PetCard {...pet}></PetCard>
            ))}
          </div>
        </div>
        <div className="chats">
          <div className="top">
            <div className="subtitle">Chat</div>
            <i className="fas fa-plus"></i>
          </div>
          <div className="chats_main">
            {chats.map((chat) => (
              <PersonCard {...chat}></PersonCard>
            ))}
          </div>
        </div>
      </nav>
    );
  }
}

export default SideBar;
