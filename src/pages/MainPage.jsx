import React, { Component } from "react";
import Chat from "../components/Chat";
import SideBar from "../components/SideBar";
import { BASE_URL } from "../config/url";
import { download } from "../services/image";
import Choosing from "./components/Choosing";
import Entrust from "./components/Entrust";
import Main from "./components/Main";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // main, choosing, entrust
      page: "choosing",
      user: {
        Username: "",
        ImgUrl: null,
        UID: 0,
      },
      chatPartner: null,
      entrustingPet: null,
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
    const { chatPartner, user, entrustingPet } = this.state;
    return (
      <div id="main">
        <SideBar user={user} statechange={this.statechange} />

        {((page) => {
          if (page === "choosing")
            return <Choosing statechange={this.statechange} />;
          else if (page === "entrust")
            return <Entrust statechange={this.statechange} />;
          else if (page === "raise" && entrustingPet != null)
            /* Later on */ return null;
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
