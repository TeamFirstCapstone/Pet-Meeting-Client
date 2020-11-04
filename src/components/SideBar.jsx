import React, { Component } from "react";
import PersonCard from "./PersonCard";
import PetCard from "./PetCard";
import "./SideBar.scss";
import { download } from "../service/image";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: null,
    };
  }

  statechange = (state) => this.setState(state);

  componentDidUpdate(prevProps, _prevState) {
    var { profile } = this.props;
    if (prevProps.profile.user.Filename !== profile.user.Filename) {
      download(profile.user.Filename).then((url) =>
        this.setState({ imgUrl: url })
      );
    }
  }

  render() {
    const { profile, statechange } = this.props;
    const { pets, chats, user } = profile;
    const { imgUrl } = this.state;
    return (
      <nav id="sidebar">
        <div className="topbar">
          <i className="fas fa-bars"></i>
          <div className="title" onClick={() => statechange({ page: "main" })}>
            Pet Meeting
          </div>
        </div>
        <div className="profile">
          <img className="profileImg" src={imgUrl} alt="" />
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
              <PersonCard
                statechange={this.props.statechange}
                {...chat}
                key={idx}
              ></PersonCard>
            ))}
          </div>
        </div>
      </nav>
    );
  }
}

export default SideBar;
