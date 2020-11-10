import React, { Component } from "react";
import Chat from "../components/Chat";
import SideBar from "../components/SideBar";
import Choosing from "./subpages/Choosing";
import Entrust from "./subpages/Entrust";
import Main from "./subpages/Main";
import Raise from "./subpages/Raise";
// import Showoff from "./subpages/Showoff";
import { user } from "../service";
import { Route } from "react-router-dom";
import ShowoffRegister from "./subpages/ShowoffRegister";
import WorryRegister from "./subpages/WorryRegister";
import Worry from "./subpages/Worry";
import Showoff from "./subpages/Showoff";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        user: {
          Username: "",
          ImgUrl: null,
          UID: 0,
        },
        pets: [],
        chats: [],
      },
      currentChat: null, //index of chats
    };
  }

  chatting = (index) => {
    if (index == null) this.setState({ currentChat: null });
    else this.setState({ currentChat: this.state.profile.chats[index] });
  };

  componentDidMount() {
    user.profile().then((profile) => this.setState({ profile }));
    // socket 다 연결하기 chats[i].socket
  }

  statechange = (state) => this.setState(state);

  render() {
    const { profile, currentChat } = this.state;
    const { match } = this.props;

    return (
      <div id="main" style={{ display: "flex", height: "100%" }}>
        <SideBar {...profile} chatting={this.chatting} />

        <Route exact path={match.url} component={Main} />
        <Route exact path={`${match.path}/entrust`} component={Entrust} />
        <Route exact path={`${match.path}/raise`} component={Choosing} />
        <Route
          exact
          path={`${match.path}/raise/:eid([0-9]+)`}
          component={Raise}
        />
        <Route exact path={`${match.path}/worry`} component={Worry} />
        <Route exact path={`${match.path}/showoff`} component={Showoff} />

        <Route
          exact
          path={`${match.path}/showoff/register`}
          component={ShowoffRegister}
        />
        <Route
          exact
          path={`${match.path}/worry/register`}
          component={WorryRegister}
        />

        {currentChat != null ? (
          <Chat
            user={profile.user}
            partner={currentChat}
            chatting={this.chatting}
          />
        ) : null}
      </div>
    );
  }
}

export default MainPage;
