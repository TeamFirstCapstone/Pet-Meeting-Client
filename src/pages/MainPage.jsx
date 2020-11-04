import React, { Component } from "react";
import Chat from "../components/Chat";
import SideBar from "../components/SideBar";
import Choosing from "./components/Choosing";
import Entrust from "./components/Entrust";
import Main from "./components/Main";
import Raise from "./components/Raise";
import Showoff from "./components/Showoff";
import { user } from "../service";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "showoff",
      profile: {
        user: {
          Username: "",
          ImgUrl: null,
          UID: 0,
        },
        pets: [],
        chats: [],
      },
      chatPartner: null,
      eid: null,
    };
  }

  statechange = (state) => this.setState(state);

  componentDidMount() {
    user.profile().then((profile) => this.setState({ profile }));
  }

  render() {
    const { chatPartner, profile, eid } = this.state;
    return (
      <div id="main" style={{ display: "flex", height: "100%" }}>
        <SideBar profile={profile} statechange={this.statechange} />

        {((page) => {
          if (page === "choosing")
            return (
              <Choosing UID={profile.user.UID} statechange={this.statechange} />
            );
          else if (page === "entrust")
            return <Entrust statechange={this.statechange} />;
          else if (page === "raise" && eid != null)
            return <Raise EID={eid} statechange={this.statechange} />;
          else if (page === "showoff")
            return <Showoff statechange={this.statechange} />;
          else return <Main statechange={this.statechange} />;
        })(this.state.page)}

        {chatPartner != null ? (
          <Chat
            user={profile.user}
            partner={chatPartner}
            statechange={this.statechange}
          />
        ) : null}
      </div>
    );
  }
}

export default MainPage;
