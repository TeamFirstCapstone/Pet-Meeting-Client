import React, { Component } from "react";
import Chat from "../components/Chat";
import SideBar from "../components/SideBar";
import { BASE_URL } from "../config/url";
import { download } from "../services/image";
import Choosing from "./components/Choosing";
import Entrust from "./components/Entrust";
import Main from "./components/Main";
import Raise from "./components/Raise";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // main, choosing, entrust
      page: "main",
      user: {
        Username: "",
        ImgUrl: null,
        UID: 0,
      },
      chatPartner: null,
      eid: null,
    };
  }

  statechange = (state) => this.setState(state);

  componentDidMount() {
    fetch(BASE_URL + "/user/my")
      .then((res) => res.json())
      .then((json) => {
        var user = json.result;
        download(user.Filename).then((url) => {
          user.ImgUrl = url;
          this.setState({ user: user });
        });
      });
  }

  render() {
    const { chatPartner, user, eid } = this.state;
    return (
      <div id="main" style={{ display: "flex", height: "100%" }}>
        <SideBar user={user} statechange={this.statechange} />

        {((page) => {
          if (page === "choosing")
            return <Choosing UID={user.UID} statechange={this.statechange} />;
          else if (page === "entrust")
            return <Entrust statechange={this.statechange} />;
          else if (page === "raise" && eid != null)
            return <Raise EID={eid} statechange={this.statechange} />;
          else return <Main statechange={this.statechange} />;
        })(this.state.page)}

        {chatPartner != null ? (
          <Chat
            user={user}
            partner={chatPartner}
            statechange={this.statechange}
          />
        ) : null}
      </div>
    );
  }
}

export default MainPage;
