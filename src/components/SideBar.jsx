import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./SideBar.scss";

class SideBar extends Component {
  static defaultProps = {
    pets: [],
    chats: [],
    user: {
      ImgUrl: null,
      Username: "",
      UID: 0,
    },
    statechange: () => {},
  };

  render() {
    const { pets, chats, user } = this.props;
    return (
      <nav id="sidebar">
        <div className="topbar">
          <i className="fas fa-bars"></i>
          <Link className="title" to="/main">
            Pet Meeting
          </Link>
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
              <PetCard {...pet} index={idx} key={idx}></PetCard>
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
              <PersonCard
                statechange={this.props.statechange}
                {...chat}
                index={idx}
                key={idx}
              ></PersonCard>
            ))}
          </div>
        </div>
      </nav>
    );
  }
}

class PetCard extends Component {
  render() {
    const { Name, Year, Gender, Species, ImgUrl } = this.props;
    return (
      <div id="petCard">
        <img className="profileImg" alt="home" src={ImgUrl}></img>
        <div className="box">
          <div className="name">{Name}</div>
          <div className="yeargender">
            <div className="year">{Year} years old</div>
            <div className="gender">
              {Gender === "female" ? (
                <i className="fas fa-venus female"></i>
              ) : (
                <i className="fas fa-mars male"></i>
              )}
            </div>
          </div>
          <div className="species">{Species}</div>
        </div>
      </div>
    );
  }
}

class PersonCard extends Component {
  render() {
    const { Username, Text, ImgUrl } = this.props;
    const { index, statechange } = this.props;

    return (
      <div id="personCard" onClick={() => statechange({ chatPartner: index })}>
        <img className="profileImg" alt="home" src={ImgUrl}></img>
        <div className="box">
          <div className="name">{Username}</div>
          <div className="text">{Text}</div>
        </div>
      </div>
    );
  }
}

export default SideBar;
